import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inspectInputs } from './inputs.mjs';
import { inspectAcceptance, localReference } from './acceptance.mjs';
import { inspectIntake } from './intake.mjs';

export async function readProjectDocuments(cwd) {
  return Promise.all(['docs/PROJECT.md', 'docs/CURRENT_STATUS.md', 'docs/DECISIONS.md'].map(async (path) => {
    try { return { path, content: await readFile(resolve(cwd, path), 'utf8') }; }
    catch { return { path, content: null }; }
  }));
}

// Bind a report to the evidence and implementation it actually checked.
export async function verificationContext(cwd, taskId) {
  const inputs = await inspectInputs(cwd);
  const acceptance = await inspectAcceptance(cwd, { taskId });
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
  const state = {
    task_id: taskId || null,
    project: (await inspectIntake(cwd)).project || {},
    inputs: inputs.inputs.filter((item) => item.status === 'active' && (!item.task_id || item.task_id === taskId))
      .map((item) => ({ id: item.id, sha256: item.sha256, changed: item.changed })),
    acceptance: acceptance.rows.map(({ issues: _issues, ...row }) => row),
    implementations,
    evidence,
  };
  return { ...state, fingerprint: createHash('sha256').update(JSON.stringify(state)).digest('hex') };
}
