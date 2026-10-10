import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { resolveVerifySteps, validateProjectConfig } from '../packages/core/src/index.mjs';

const schema = JSON.parse(readFileSync(new URL('../schemas/project.schema.json', import.meta.url), 'utf8'));

const config = {
  commands: { lint: 'pnpm lint', test: 'pnpm test' },
  harness: { version: '0.1.0' },
  project: { name: 'example', platforms: ['web_mobile'], product_type: 'consumer_h5' },
  stack: { adapter: 'uni-app' },
  verify: {
    audit: { commands: ['lint', 'test'], fail_fast: false },
    quick: { commands: ['lint'], fail_fast: true },
  },
};

test('validates a minimal project configuration', () => {
  assert.equal(validateProjectConfig(config), config);
});

test('resolves fail-fast quick verification', () => {
  assert.deepEqual(resolveVerifySteps(config, 'quick'), {
    failFast: true,
    steps: [{ command: 'pnpm lint', name: 'lint' }],
  });
});

test('resolves non-fail-fast audit verification', () => {
  assert.equal(resolveVerifySteps(config, 'audit').failFast, false);
});

test('rejects an undefined command reference', () => {
  assert.throws(
    () =>
      resolveVerifySteps(
        { ...config, verify: { quick: { commands: ['missing'], fail_fast: true } } },
        'quick',
      ),
    /未定义命令/,
  );
});

test('accepts project-defined product, runtime, toolchain and package manager labels', () => {
  const extensible = {
    harness: { version: '0.1.0' },
    project: { name: 'arbitrary-project', product_type: 'research-service', platforms: ['edge-runtime'] },
    stack: { adapter: 'custom-toolchain', package_manager: 'workspace-manager' },
  };
  assert.equal(validateProjectConfig(extensible), extensible);
});

test('accepts a constraint-only project without stack, commands or verification modes', () => {
  const minimal = { harness: { version: '0.1.0', mode: 'generic' }, project: { name: 'docs-only' } };
  assert.equal(validateProjectConfig(minimal), minimal);
  assert.ok(!schema.required.includes('commands'));
  assert.ok(!schema.required.includes('verify'));
  assert.equal(schema.properties.project.properties.product_type.enum, undefined);
  assert.equal(schema.properties.stack.properties.adapter.enum, undefined);
});

test('rejects empty command values during configuration validation', () => {
  assert.throws(
    () => validateProjectConfig({ ...config, commands: { ...config.commands, build: '' } }),
    /commands\.build 必须是非空字符串/,
  );
});

test('validates an optional OpenAPI snapshot source', () => {
  const sourcedConfig = {
    ...config,
    sources: {
      api: { provider: 'openapi', snapshot: '.continue-harness/snapshots/openapi.json' },
    },
  };
  assert.equal(validateProjectConfig(sourcedConfig), sourcedConfig);
});

test('rejects an unsupported API source provider', () => {
  assert.throws(
    () =>
      validateProjectConfig({
        ...config,
        sources: { api: { provider: 'apifox-sdk', snapshot: '' } },
      }),
    /sources\.api\.provider.*sources\.api\.snapshot/s,
  );
});

test('schema and runtime both support legacy array verification definitions', () => {
  const verifyDefinition = schema.properties.verify.additionalProperties.oneOf;
  assert.ok(verifyDefinition.some((definition) => definition.type === 'array'));
  const legacyConfig = structuredClone(config);
  legacyConfig.verify.quick = ['lint'];
  assert.equal(validateProjectConfig(legacyConfig), legacyConfig);
  assert.equal(resolveVerifySteps(legacyConfig, 'quick').steps.length, 1);
});

test('validates a generic UI System selection without binding Core to a library', () => {
  const uiConfig = structuredClone(config);
  uiConfig.ui = { system: { adapter: 'custom-mobile', version: '2.1.0', policy: 'preferred' } };
  assert.equal(validateProjectConfig(uiConfig), uiConfig);
  uiConfig.ui.system.policy = 'sometimes';
  assert.throws(() => validateProjectConfig(uiConfig), /ui\.system\.policy/);
});

test('requires package and version for an installed UI runtime', () => {
  const uiConfig = structuredClone(config);
  uiConfig.ui = { system: { adapter: 'custom-mobile', version: '2.1.0', policy: 'preferred', runtime: { status: 'installed' } } };
  assert.throws(() => validateProjectConfig(uiConfig), /runtime\.package.*runtime\.version/s);
});
