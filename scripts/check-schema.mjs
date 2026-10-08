import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import YAML from 'yaml';

const root = resolve(import.meta.dirname, '..');
const schema = JSON.parse(await readFile(resolve(root, 'schemas/project.schema.json'), 'utf8'));
const source = await readFile(resolve(root, '.continue-harness/project.yaml'), 'utf8');
const config = YAML.parse(source);
const ajv = new Ajv2020({ allErrors: true, strict: false });
const valid = ajv.compile(schema)(config);

if (!valid) {
  console.error('project schema check failed');
  for (const error of ajv.errors || []) console.error(`- ${error.instancePath || '/'} ${error.message}`);
  process.exitCode = 1;
} else {
  console.log('project schema check passed');
}
