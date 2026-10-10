import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadProjectConfig } from './config.mjs';
import { inspectInputs } from './inputs.mjs';
import { inspectAcceptance, localReference } from './acceptance.mjs';
import { inspectIntake } from './intake.mjs';

export async function readProjectDocuments(cwd) {
  return Promise.all(['docs/PROJECT.md', 'docs/CURRENT_STATUS.md', 'docs/DECISIONS.md'].map(async (path) => {
    try { return { path, content: await readFile(resolve(cwd, path), 'utf8') }; }
    catch { return { path, content: null }; }
  }));
}

// Verification commands decide what a report actually covers, so they belong to the bound state.
// A project without a readable configuration still produces reports; Doctor reports the gap.
async function readVerificationConfig(cwd) {
  try {
    const { config } = await loadProjectConfig(cwd);
    return { commands: config.commands || {}, verify: config.verify || {} };
  } catch {
    return null;
  }
}

// The state a report binds to: scope, inputs, implementation, evidence and verification commands.
export async function verificationState(cwd, taskId) {
  const inputs = await inspectInputs(cwd);
  const acceptance = await inspectAcceptance(cwd, { taskId });
  const intake = await inspectIntake(cwd);
  const implementations = {};
  const evidence = {};
  for (const row of acceptance.rows) {
    const path = localReference(row.implementation);
    try { implementations[path] = createHash('sha256').update(await readFile(resolve(cwd, path))).digest('hex'); }
    catch { implementations[path] = null; }
    const evidencePath = localReference(row.evidence || '');
    try { evidence[evidencePath] = createHash('sha256').update(await readFile(resolve(cwd, evidencePath))).digest('hex'); }
    catch { evidence[evidencePath] = null; }
  }
  return {
    task_id: taskId || null,
    project: intake.project || {},
    intake: { status: intake.status, evidence: intake.evidence || [] },
    verify: await readVerificationConfig(cwd),
    inputs: inputs.inputs.filter((item) => item.status === 'active' && (!item.task_id || item.task_id === taskId))
      .map((item) => ({ id: item.id, sha256: item.sha256, changed: item.changed })),
    acceptance: acceptance.rows.map(({ issues: _issues, ...row }) => row),
    implementations,
    evidence,
  };
}

export function fingerprintState(state) {
  return createHash('sha256').update(JSON.stringify(state)).digest('hex');
}

// Bind a report to the evidence and implementation it actually checked. When the pre-verification
// state is supplied, the report also records whether anything moved while the commands ran, so a
// mid-run edit cannot be mistaken for a valid binding.
export async function verificationContext(cwd, taskId, { before } = {}) {
  const state = await verificationState(cwd, taskId);
  const fingerprint = fingerprintState(state);
  const beforeFingerprint = before ? fingerprintState(before) : null;
  return {
    ...state,
    ...(beforeFingerprint
      ? { before_fingerprint: beforeFingerprint, changed_during_verification: beforeFingerprint !== fingerprint }
      : {}),
    fingerprint,
  };
}
