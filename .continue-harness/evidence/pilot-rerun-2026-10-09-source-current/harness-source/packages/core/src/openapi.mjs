import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { resolveHarnessPath } from './paths.mjs';

const HTTP_METHODS = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function hash(content) {
  return createHash('sha256').update(content).digest('hex');
}

function identifier(value, fallback = 'Value') {
  const words = String(value || fallback).replace(/[^a-zA-Z0-9_$]+/g, ' ').trim().split(/\s+/);
  const output = words.map((word, index) => index === 0
    ? word.replace(/^[0-9]/, (digit) => `_${digit}`)
    : `${word[0]?.toUpperCase() || ''}${word.slice(1)}`).join('');
  return output || fallback;
}

function typeName(value) {
  const valueName = identifier(value);
  return `${valueName[0]?.toUpperCase() || ''}${valueName.slice(1)}`;
}

function literal(value) {
  return typeof value === 'string' ? JSON.stringify(value) : String(value);
}

function schemaType(schema = {}) {
  if (!schema || typeof schema !== 'object') return 'unknown';
  if (schema.$ref) return typeName(decodeURIComponent(schema.$ref.split('/').at(-1)));
  if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum.map(literal).join(' | ');
  if (schema.const !== undefined) return literal(schema.const);
  if (schema.oneOf || schema.anyOf) return (schema.oneOf || schema.anyOf).map(schemaType).join(' | ');
  if (schema.allOf) return schema.allOf.map(schemaType).join(' & ');
  let output;
  if (schema.type === 'array') output = `Array<${schemaType(schema.items)}>`;
  else if (schema.type === 'object' || schema.properties) {
    const required = new Set(schema.required || []);
    const fields = Object.entries(schema.properties || {}).map(([name, value]) =>
      `${JSON.stringify(name)}${required.has(name) ? '' : '?'}: ${schemaType(value)};`);
    if (schema.additionalProperties) fields.push(`[key: string]: ${schemaType(schema.additionalProperties === true ? {} : schema.additionalProperties)};`);
    output = fields.length ? `{ ${fields.join(' ')} }` : 'Record<string, unknown>';
  } else if (schema.type === 'integer' || schema.type === 'number') output = 'number';
  else if (schema.type === 'boolean') output = 'boolean';
  else if (schema.type === 'string') output = 'string';
  else output = 'unknown';
  return schema.nullable ? `${output} | null` : output;
}

function operationName(method, path, operation) {
  if (operation.operationId) return identifier(operation.operationId, `${method}Operation`);
  return identifier(`${method} ${path.replace(/[{}]/g, '')}`, `${method}Operation`);
}

export function listOpenApiOperations(document) {
  if (!document?.paths || typeof document.paths !== 'object') throw new Error('OpenAPI 文档缺少 paths 对象');
  const operations = [];
  for (const [path, pathItem] of Object.entries(document.paths)) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem?.[method];
      if (!operation) continue;
      operations.push({
        deprecated: Boolean(operation.deprecated),
        method: method.toUpperCase(),
        operationId: operation.operationId || operationName(method, path, operation),
        path,
        summary: operation.summary || '',
        tags: operation.tags || [],
      });
    }
  }
  return operations.sort((a, b) => a.operationId.localeCompare(b.operationId));
}

function mediaSchema(content) {
  return content?.['application/json']?.schema || Object.values(content || {})[0]?.schema;
}

function responseSchema(operation) {
  const success = Object.entries(operation.responses || {})
    .filter(([status]) => /^2\d\d$/.test(status) || status === 'default')
    .sort(([a], [b]) => a.localeCompare(b))[0]?.[1];
  return mediaSchema(success?.content) || success?.schema || {};
}

function operationDetails(document, selected) {
  const operations = [];
  for (const [path, pathItem] of Object.entries(document.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem?.[method];
      if (!operation) continue;
      const name = operationName(method, path, operation);
      if (!selected.has(operation.operationId || name)) continue;
      const parameters = [...(pathItem.parameters || []), ...(operation.parameters || [])];
      operations.push({
        body: mediaSchema(operation.requestBody?.content) || operation.requestBody?.schema,
        method: method.toUpperCase(), name, operation, parameters, path,
        response: responseSchema(operation),
      });
    }
  }
  const found = new Set(operations.map((item) => item.operation.operationId || item.name));
  const missing = [...selected].filter((name) => !found.has(name));
  if (missing.length) throw new Error(`OpenAPI 中找不到 operation：${missing.join(', ')}`);
  return operations.sort((a, b) => a.name.localeCompare(b.name));
}

function requestType(operation) {
  const groups = new Map();
  for (const parameter of operation.parameters) {
    if (parameter.$ref) continue;
    const location = parameter.in === 'header' ? 'headers' : parameter.in;
    if (!['path', 'query', 'headers'].includes(location)) continue;
    if (!groups.has(location)) groups.set(location, []);
    groups.get(location).push(parameter);
  }
  const fields = [];
  for (const [group, parameters] of groups) {
    const required = group === 'path' || parameters.some((item) => item.required);
    const properties = parameters.map((item) => `${JSON.stringify(item.name)}${item.required || group === 'path' ? '' : '?'}: ${schemaType(item.schema || {})};`);
    fields.push(`${group}${required ? '' : '?'}: { ${properties.join(' ')} };`);
  }
  if (operation.body) fields.push(`body${operation.operation.requestBody?.required ? '' : '?'}: ${schemaType(operation.body)};`);
  return fields.length ? `{ ${fields.join(' ')} }` : 'Record<string, never>';
}

export function generateOpenApiArtifacts(document, operationIds) {
  const version = document?.openapi || document?.swagger;
  if (!(String(version).startsWith('3.') || version === '2.0')) throw new Error('仅支持 OpenAPI 3.x 或 Swagger 2.0 JSON');
  if (!Array.isArray(operationIds) || !operationIds.length) throw new Error('任务必须至少选择一个 operation');
  const operations = operationDetails(document, new Set(operationIds));
  const componentTypes = Object.entries(document.components?.schemas || document.definitions || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, schema]) => `export type ${typeName(name)} = ${schemaType(schema)};`);
  const operationTypes = operations.flatMap((item) => {
    const name = typeName(item.name);
    return [`export type ${name}Request = ${requestType(item)};`, `export type ${name}Response = ${schemaType(item.response)};`];
  });
  const types = `/* 此文件由 continue-harness 根据 OpenAPI 生成，请勿手工修改。 */\n\n${[...componentTypes, ...operationTypes].join('\n\n')}\n`;
  const imports = operations.flatMap((item) => [`${typeName(item.name)}Request`, `${typeName(item.name)}Response`]);
  const functions = operations.map((item) => {
    const name = identifier(item.name);
    const type = typeName(item.name);
    const pathParameters = item.parameters.filter((parameter) => parameter.in === 'path' && !parameter.$ref);
    const pathLines = pathParameters.map((parameter) => `  path = path.replace(${JSON.stringify(`{${parameter.name}}`)}, encodeURIComponent(String(input.path[${JSON.stringify(parameter.name)}])));`);
    const queryPath = item.parameters.some((parameter) => parameter.in === 'query') ? 'withQuery(path, input.query)' : 'path';
    const data = item.body ? '\n    data: input.body,' : '';
    const header = item.parameters.some((parameter) => parameter.in === 'header') ? '\n    header: input.headers,' : '';
    return `export function ${name}(input: ${type}Request): Promise<${type}Response> {\n  let path = ${JSON.stringify(item.path)};\n${pathLines.join('\n')}${pathLines.length ? '\n' : ''}  return request<${type}Response>({${data}${header}\n    method: ${JSON.stringify(item.method)},\n    path: ${queryPath},\n  });\n}`;
  });
  const services = `/* 此文件由 continue-harness 根据 OpenAPI 生成，请勿手工修改。 */\n\nimport { request } from './http';\nimport type { ${imports.join(', ')} } from '../types/api.generated';\n\nfunction withQuery(path: string, query?: Record<string, unknown>): string {\n  if (!query) return path;\n  const parameters = new URLSearchParams();\n  for (const [key, value] of Object.entries(query)) {\n    if (value === undefined || value === null) continue;\n    for (const item of Array.isArray(value) ? value : [value]) parameters.append(key, String(item));\n  }\n  const suffix = parameters.toString();\n  return suffix ? \`${'${path}'}?${'${suffix}'}\` : path;\n}\n\n${functions.join('\n\n')}\n`;
  return { operations: operations.map((item) => item.operation.operationId || item.name), services, types };
}

export async function planOpenApiGeneration({ cwd, document, operationIds, sourcePath, taskId }) {
  const generated = generateOpenApiArtifacts(document, operationIds);
  const metadataPathInfo = await resolveHarnessPath(cwd, 'api/generated.json');
  const metadataPath = metadataPathInfo.absolutePath;
  let previous = { outputs: {} };
  if (await exists(metadataPath)) {
    try { previous = JSON.parse(await readFile(metadataPath, 'utf8')); } catch { throw new Error(`${metadataPathInfo.relativePath} 无效，拒绝覆盖生成文件`); }
  }
  const definitions = [
    ['src/types/api.generated.ts', generated.types],
    ['src/services/api.generated.ts', generated.services],
  ];
  const entries = [];
  for (const [target, content] of definitions) {
    const absolutePath = resolve(cwd, target);
    const current = await exists(absolutePath) ? await readFile(absolutePath, 'utf8') : null;
    const currentHash = current === null ? null : hash(current);
    const outputHash = hash(content);
    const status = current === null ? 'create' : currentHash === outputHash ? 'unchanged'
      : previous.outputs?.[target]?.sha256 === currentHash ? 'managed_update' : 'conflict';
    entries.push({ content, sha256: outputHash, status, target });
  }
  const sourceContent = await readFile(resolve(cwd, sourcePath));
  const metadata = {
    generated_at: new Date().toISOString(),
    operations: generated.operations,
    outputs: Object.fromEntries(entries.map((entry) => [entry.target, { sha256: entry.sha256 }])),
    source: { path: sourcePath, sha256: hash(sourceContent) },
    task_id: taskId,
    version: 1,
  };
  return { entries, metadata, metadataPath: relative(cwd, metadataPath), status: entries.some((entry) => entry.status === 'conflict') ? 'conflict' : 'ready' };
}

export async function applyOpenApiGeneration(cwd, plan) {
  if (plan.status === 'conflict') throw new Error('生成文件已被项目修改；请先保留、迁移或删除手工改动');
  for (const entry of plan.entries) {
    if (entry.status === 'unchanged') continue;
    const target = resolve(cwd, entry.target);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, entry.content, 'utf8');
  }
  const metadataPath = resolve(cwd, plan.metadataPath);
  await mkdir(dirname(metadataPath), { recursive: true });
  await writeFile(metadataPath, `${JSON.stringify(plan.metadata, null, 2)}\n`, 'utf8');
}
