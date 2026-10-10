import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import YAML from 'yaml';

import { validateUiSystemConfig } from './ui-system.mjs';
import { HARNESS_DIRECTORY, LEGACY_HARNESS_DIRECTORY } from './paths.mjs';

export async function loadProjectConfig(cwd, configPath) {
  const candidates = configPath
    ? [configPath]
    : [`${HARNESS_DIRECTORY}/project.yaml`, `${LEGACY_HARNESS_DIRECTORY}/project.yaml`];
  let absolutePath;
  for (const candidate of candidates) {
    const candidatePath = resolve(cwd, candidate);
    try {
      await readFile(candidatePath, 'utf8');
      absolutePath = candidatePath;
      break;
    } catch (error) {
      if (error?.code !== 'ENOENT' || candidate === candidates.at(-1)) throw error;
    }
  }
  if (!absolutePath) absolutePath = resolve(cwd, candidates[0]);
  const source = await readFile(absolutePath, 'utf8');
  const config = YAML.parse(source);
  validateProjectConfig(config);
  return { config, path: absolutePath };
}

export function validateProjectConfig(config) {
  const issues = [];
  if (!config || typeof config !== 'object') issues.push('配置必须是对象');
  if (typeof config?.harness?.version !== 'string' || !config.harness.version.trim()) {
    issues.push('缺少 harness.version');
  }
  if (typeof config?.project?.name !== 'string' || !config.project.name.trim()) {
    issues.push('缺少 project.name');
  }
  if (config?.project?.product_type !== undefined && (typeof config.project.product_type !== 'string' || !config.project.product_type.trim())) {
    issues.push('project.product_type 必须是非空字符串');
  }
  if (config?.project?.platforms !== undefined && (!Array.isArray(config.project.platforms)
    || config.project.platforms.some((platform) => typeof platform !== 'string' || !platform.trim()))) {
    issues.push('project.platforms 必须是非空字符串组成的数组');
  }
  if (config?.stack?.adapter !== undefined && (typeof config.stack.adapter !== 'string' || !config.stack.adapter.trim())) {
    issues.push('stack.adapter 必须是非空字符串');
  }
  if (config?.stack?.package_manager !== undefined && (typeof config.stack.package_manager !== 'string' || !config.stack.package_manager.trim())) {
    issues.push('stack.package_manager 必须是非空字符串');
  }
  if (config?.commands && (typeof config.commands !== 'object' || Array.isArray(config.commands))) {
    issues.push('commands 必须是对象');
  } else if (config?.commands) {
    for (const [name, command] of Object.entries(config.commands)) {
      if (!name || typeof command !== 'string' || !command.trim()) {
        issues.push(`commands.${name || '<empty>'} 必须是非空字符串`);
      }
    }
  }
  if (config?.verify && (typeof config.verify !== 'object' || Array.isArray(config.verify))) {
    issues.push('verify 必须是对象');
  } else if (config?.verify) {
    for (const [mode, definition] of Object.entries(config.verify)) {
      const commandNames = Array.isArray(definition) ? definition : definition?.commands;
      const explicitlyNotConfigured = !Array.isArray(definition) && definition?.status === 'not_configured';
      if (explicitlyNotConfigured) continue;
      if (!Array.isArray(commandNames) || !commandNames.length) {
        issues.push(`verify.${mode}.commands 不能为空`);
        continue;
      }
      for (const name of commandNames) {
        if (typeof name !== 'string' || !config.commands?.[name]) {
          issues.push(`verify.${mode} 引用了未定义命令：${String(name)}`);
        }
      }
    }
  }
  const apiSource = config?.sources?.api;
  if (apiSource !== undefined) {
    if (!apiSource || typeof apiSource !== 'object' || Array.isArray(apiSource)) {
      issues.push('sources.api 必须是对象');
    } else {
      if (apiSource.provider !== 'openapi') issues.push('sources.api.provider 必须是 openapi');
      if (typeof apiSource.snapshot !== 'string' || !apiSource.snapshot.trim()) {
        issues.push('sources.api.snapshot 必须是非空路径');
      }
    }
  }
  issues.push(...validateUiSystemConfig(config));
  if (issues.length) {
    throw new Error(`continue-harness 配置无效：${issues.join('；')}`);
  }
  return config;
}

export function resolveVerifySteps(config, mode) {
  const definition = config.verify?.[mode];
  if (!definition) throw new Error(`未配置 verify.${mode}`);
  const commandNames = Array.isArray(definition) ? definition : definition.commands;
  if (!Array.isArray(definition) && definition.status === 'not_configured') {
    return {
      failFast: false,
      notConfigured: true,
      steps: [],
    };
  }
  if (!Array.isArray(commandNames) || !commandNames.length) {
    throw new Error(`verify.${mode}.commands 不能为空`);
  }
  return {
    failFast: Array.isArray(definition) ? true : definition.fail_fast !== false,
    steps: commandNames.map((name) => {
      const command = config.commands[name];
      if (!command) throw new Error(`verify.${mode} 引用了未定义命令：${name}`);
      return { command, name };
    }),
  };
}
