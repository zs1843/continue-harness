import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';

export const INTAKE_PATH = '.continue-harness/intake.yaml';
const LOG_PATH = '.continue-harness/logs/commands.ndjson';

export const INTAKE_QUESTIONS = {
  basic_info: [
    { id: 'project_type', question: '项目属于前端、后端、客户端、数据、基础设施还是混合项目？' },
    { id: 'goal', question: '项目目标、范围、非目标和主要交付物是什么？' },
    { id: 'runtime', question: '运行环境、部署目标和协作/交接对象是什么？' },
    { id: 'toolchain', question: '语言、框架、构建、包管理和测试工具是什么？未知项可标记 pending。' },
  ],
  evidence: {
    frontend: ['prd', 'rp', 'ui', 'api', 'assets'],
    client: ['prd', 'rp', 'ui', 'api', 'assets'],
    backend: ['requirements', 'domain', 'api', 'data_model', 'deployment', 'non_functional'],
    data: ['requirements', 'data_contract', 'evaluation', 'runtime', 'resource_constraints'],
    infrastructure: ['architecture', 'environment', 'permissions', 'rollback', 'change_window'],
    mixed: ['requirements', 'architecture', 'api', 'data', 'ui', 'deployment'],
  },
};

function initialState(name) {
  return {
    version: 1,
    phase: 'basic_info',
    status: 'awaiting_answers',
    project: { name, type: 'pending', goal: 'pending', runtime: 'pending', toolchain: 'pending' },
    evidence: [],
    questions: INTAKE_QUESTIONS.basic_info,
    updated_at: new Date().toISOString(),
  };
}

export async function createInitialIntake(cwd, name) {
  const path = resolve(cwd, INTAKE_PATH);
  try { return YAML.parse(await readFile(path, 'utf8')); } catch (error) { if (error?.code !== 'ENOENT') throw error; }
  const state = initialState(name);
  await mkdir(resolve(cwd, '.continue-harness'), { recursive: true });
  await writeFile(path, YAML.stringify(state), 'utf8');
  return state;
}

export async function inspectIntake(cwd) {
  const path = resolve(cwd, INTAKE_PATH);
  try {
    const state = YAML.parse(await readFile(path, 'utf8')) || {};
    return { path: INTAKE_PATH, exists: true, ...state };
  } catch (error) {
    if (error?.code === 'ENOENT') return { path: INTAKE_PATH, exists: false, status: 'not_initialized' };
    throw error;
  }
}

export async function appendCommandLog(cwd, entry) {
  const path = resolve(cwd, LOG_PATH);
  await mkdir(resolve(cwd, '.continue-harness/logs'), { recursive: true });
  await appendFile(path, `${JSON.stringify({ timestamp: new Date().toISOString(), ...entry })}\n`, 'utf8');
  return LOG_PATH;
}
