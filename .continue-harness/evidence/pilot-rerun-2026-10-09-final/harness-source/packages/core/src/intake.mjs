import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';

export const INTAKE_PATH = '.continue-harness/intake.yaml';
const LOG_PATH = '.continue-harness/logs/commands.ndjson';

export const BASIC_INFO_FIELDS = ['type', 'goal', 'runtime', 'toolchain'];

// The question list uses the human-facing `project_type` id for the `type` fact.
const BASIC_INFO_QUESTION_IDS = { goal: 'goal', runtime: 'runtime', toolchain: 'toolchain', type: 'project_type' };

// A basic fact counts as confirmed only after a real answer replaces the placeholder.
const UNRESOLVED_FACT_VALUES = new Set(['', 'pending', 'needs_confirmation', 'unknown', 'tbd', 'n/a', 'na', '待确认', '未知', '待定']);

export const INTAKE_QUESTIONS = {
  basic_info: [
    { id: 'project_type', question: '项目属于前端、后端、客户端、数据、基础设施还是混合项目？' },
    { id: 'goal', question: '项目目标、范围、非目标和主要交付物是什么？' },
    { id: 'runtime', question: '运行环境、部署目标和协作/交接对象是什么？' },
    { id: 'toolchain', question: '语言、框架、构建、包管理和测试工具是什么？确实未知时可暂时标记 pending，但 Intake 不会判定为已确认。' },
  ],
  evidence: {
    frontend: [
      { id: 'requirements', required: true, question: '需求范围、非目标和验收标准是什么？' },
      { id: 'ui', required: false, question: '本次任务是否涉及 UI、视觉或交互输入？' },
      { id: 'api', required: false, question: '本次任务是否依赖接口契约或后端数据？' },
      { id: 'assets', required: false, question: '本次任务是否依赖品牌、图片、字体或其他素材？' },
      { id: 'rp', required: false, question: '是否存在原型或页面流程输入？' },
    ],
    client: [
      { id: 'requirements', required: true, question: '需求范围、非目标和验收标准是什么？' },
      { id: 'ui', required: false, question: '本次任务是否涉及 UI、视觉或交互输入？' },
      { id: 'api', required: false, question: '本次任务是否依赖接口契约或后端数据？' },
      { id: 'assets', required: false, question: '本次任务是否依赖客户端资源或设备输入？' },
    ],
    backend: [
      { id: 'requirements', required: true, question: '需求范围、非目标和验收标准是什么？' },
      { id: 'domain', required: true, question: '领域规则、状态和权限边界是什么？' },
      { id: 'api', required: false, question: '是否存在 API 契约或上下游接口输入？' },
      { id: 'data_model', required: false, question: '是否涉及数据模型、迁移或数据约束？' },
      { id: 'deployment', required: false, question: '是否存在部署、回滚或运行环境约束？' },
      { id: 'non_functional', required: false, question: '是否有性能、安全、可靠性等非功能要求？' },
    ],
    data: [
      { id: 'requirements', required: true, question: '目标、范围和验收指标是什么？' },
      { id: 'data_contract', required: true, question: '数据来源、字段和版本契约是什么？' },
      { id: 'evaluation', required: false, question: '是否存在评估集、指标或对照基线？' },
      { id: 'runtime', required: false, question: '是否存在运行环境或资源约束？' },
    ],
    infrastructure: [
      { id: 'requirements', required: true, question: '基础设施目标、范围和验收标准是什么？' },
      { id: 'architecture', required: true, question: '架构、依赖和变更边界是什么？' },
      { id: 'environment', required: true, question: '环境、权限和配置来源是什么？' },
      { id: 'permissions', required: false, question: '是否需要额外权限审批？' },
      { id: 'rollback', required: false, question: '回滚策略和恢复点是什么？' },
    ],
    mixed: [
      { id: 'requirements', required: true, question: '需求范围、非目标和验收标准是什么？' },
      { id: 'architecture', required: false, question: '是否需要记录跨模块或跨运行环境架构？' },
      { id: 'api', required: false, question: '是否存在接口契约？' },
      { id: 'data', required: false, question: '是否存在数据契约或数据迁移？' },
      { id: 'ui', required: false, question: '是否涉及 UI 或交互输入？' },
      { id: 'deployment', required: false, question: '是否存在部署和回滚约束？' },
    ],
  },
};

export function evidenceDefinition(type) {
  // Project types suggest questions; only requirements are universally required.
  return (INTAKE_QUESTIONS.evidence[type] || INTAKE_QUESTIONS.evidence.mixed)
    .map((item) => ({ ...item, required: item.id === 'requirements' }));
}

// Project facts must be confirmed before evidence can be considered complete.
export function basicInfoStatus(state) {
  const project = state?.project;
  const fields = BASIC_INFO_FIELDS.filter((key) => {
    const value = project?.[key];
    return typeof value !== 'string' || UNRESOLVED_FACT_VALUES.has(value.trim().toLowerCase());
  });
  return { complete: fields.length === 0, fields, unresolved: fields.length };
}

export function intakeEvidenceStatus(state) {
  const basic = basicInfoStatus(state);
  const evidence = Array.isArray(state?.evidence) ? state.evidence : [];
  const unresolved = evidence.filter((item) => !['confirmed', 'not_applicable'].includes(item.status));
  const required = evidence.filter((item) => (item.required && item.status !== 'confirmed')
    || (item.status === 'confirmed' && !String(item.source || '').trim())
    || (item.status === 'not_applicable' && !String(item.note || '').trim()));
  return {
    basic_info: basic.fields,
    complete: basic.complete && evidence.some((item) => item.id === 'requirements' && item.status === 'confirmed' && String(item.source || '').trim())
      && unresolved.length === 0 && required.length === 0,
    required: required.length,
    unresolved: unresolved.length,
  };
}

// Surface whichever questions still block confirmation: project facts first, then evidence.
export function pendingIntakeQuestions(state) {
  const basic = basicInfoStatus(state);
  if (!basic.complete) {
    const questionIds = basic.fields.map((field) => BASIC_INFO_QUESTION_IDS[field]);
    return INTAKE_QUESTIONS.basic_info.filter((item) => questionIds.includes(item.id));
  }
  const evidence = Array.isArray(state?.evidence) ? state.evidence : [];
  const questions = evidence
    .filter((item) => !['confirmed', 'not_applicable'].includes(item.status)
      || (item.status === 'confirmed' && !String(item.source || '').trim())
      || (item.status === 'not_applicable' && (item.required || !String(item.note || '').trim())))
    .map(({ id, question, required }) => ({ id, question, required }));
  if (!evidence.some((item) => item.id === 'requirements' && item.status === 'confirmed' && String(item.source || '').trim())
    && !questions.some((item) => item.id === 'requirements')) questions.unshift(evidenceDefinition(state.project?.type)[0]);
  return questions;
}

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
    const status = intakeEvidenceStatus(state);
    return { ...state, path: INTAKE_PATH, exists: true,
      phase: status.basic_info.length ? 'basic_info' : 'evidence',
      status: status.complete ? 'confirmed' : status.basic_info.length ? 'awaiting_answers' : 'awaiting_evidence',
      questions: pendingIntakeQuestions(state) };
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
