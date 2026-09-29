import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

import { generateOpenApiArtifacts } from '../packages/core/src/index.mjs';

const repository = resolve(import.meta.dirname, '..');
const cli = resolve(repository, 'packages/cli/bin/continue-harness.mjs');
const document = {
  openapi: '3.0.3',
  info: { title: 'Pilot', version: '1.0.0' },
  paths: {
    '/users/{id}': {
      get: {
        operationId: 'getUser',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          { in: 'query', name: 'detail', schema: { type: 'boolean' } },
        ],
        responses: { 200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } } },
      },
    },
  },
  components: { schemas: { User: { type: 'object', required: ['id'], properties: { id: { type: 'string' }, nickname: { type: 'string' } } } } },
};

test('generates deterministic task-scoped types and services', () => {
  const result = generateOpenApiArtifacts(document, ['getUser']);
  assert.match(result.types, /export type User =/);
  assert.match(result.types, /export type GetUserResponse = User/);
  assert.match(result.services, /export function getUser/);
  assert.match(result.services, /encodeURIComponent/);
  assert.deepEqual(result.operations, ['getUser']);
});

test('CLI combines task PRD selection with an API input and protects generated files', async () => {
  const cwd = await mkdtemp(resolve(tmpdir(), 'continue-harness-api-'));
  await mkdir(resolve(cwd, '.continue-harness/inputs/api'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/inputs/prd'), { recursive: true });
  await mkdir(resolve(cwd, '.continue-harness/api'), { recursive: true });
  await writeFile(resolve(cwd, '.continue-harness/inputs/api/openapi.json'), JSON.stringify(document));
  await writeFile(resolve(cwd, '.continue-harness/inputs/prd/T001.md'), '# 用户详情\n');
  await writeFile(resolve(cwd, '.continue-harness/inputs/manifest.yaml'), `inputs:\n  - id: PRD-T001\n    type: prd\n    status: active\n    path: .continue-harness/inputs/prd/T001.md\n  - id: API-001\n    type: api\n    status: active\n    path: .continue-harness/inputs/api/openapi.json\n`);
  await writeFile(resolve(cwd, '.continue-harness/api/selection.yaml'), `version: 1\ntasks:\n  T001:\n    prd_inputs: [PRD-T001]\n    api_input: API-001\n    operations: [getUser]\n`);
  const generated = spawnSync(process.execPath, [cli, 'api', 'generate', '--task', 'T001', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(generated.status, 0, generated.stderr);
  assert.equal(JSON.parse(generated.stdout).status, 'ready');
  assert.match(await readFile(resolve(cwd, 'src/services/api.generated.ts'), 'utf8'), /getUser/);
  await writeFile(resolve(cwd, 'src/services/api.generated.ts'), '// manual edit\n');
  const conflict = spawnSync(process.execPath, [cli, 'api', 'generate', '--task', 'T001', '--dry-run', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(conflict.status, 1);
  assert.equal(JSON.parse(conflict.stdout).status, 'conflict');
});
