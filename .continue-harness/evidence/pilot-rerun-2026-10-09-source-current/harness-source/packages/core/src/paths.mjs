import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

export const HARNESS_DIRECTORY = '.continue-harness';
export const LEGACY_HARNESS_DIRECTORY = '.fe-harness';

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve the state directory used by a target project.
 * New projects use .continue-harness. Existing projects using .fe-harness
 * continue to work until they are explicitly migrated.
 */
export async function resolveHarnessDirectory(cwd) {
  if (await exists(resolve(cwd, HARNESS_DIRECTORY))) return HARNESS_DIRECTORY;
  if (await exists(resolve(cwd, LEGACY_HARNESS_DIRECTORY))) return LEGACY_HARNESS_DIRECTORY;
  return HARNESS_DIRECTORY;
}

export async function resolveHarnessPath(cwd, relativePath = '') {
  const directory = await resolveHarnessDirectory(cwd);
  return {
    directory,
    relativePath: `${directory}/${relativePath}`.replace(/\/$/, ''),
    absolutePath: resolve(cwd, directory, relativePath),
  };
}

export function isHarnessPath(path) {
  const normalized = String(path || '').replaceAll('\\', '/');
  return normalized.includes(`/${HARNESS_DIRECTORY}/`)
    || normalized.startsWith(`${HARNESS_DIRECTORY}/`)
    || normalized.includes(`/${LEGACY_HARNESS_DIRECTORY}/`)
    || normalized.startsWith(`${LEGACY_HARNESS_DIRECTORY}/`);
}

export function replaceLegacyHarnessPath(path) {
  return String(path || '').replace(
    new RegExp(`(^|/)${LEGACY_HARNESS_DIRECTORY}(?=/|$)`),
    `$1${HARNESS_DIRECTORY}`,
  );
}
