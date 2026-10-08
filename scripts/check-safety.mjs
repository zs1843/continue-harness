import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const { stdout } = await run('git', ['ls-files', '-z'], { encoding: 'utf8' });
const files = stdout.split('\0').filter(Boolean);
const forbidden = files.filter((file) => {
  if (file.endsWith('.env.example')) return false;
  return /(^|\/)\.env(?:\.|$)|(^|\/)(node_modules|tmp|coverage|test-results|playwright-report)(\/|$)/.test(file);
});

if (forbidden.length) {
  console.error('tracked sensitive or generated paths found:');
  for (const file of forbidden) console.error(`- ${file}`);
  process.exitCode = 1;
} else {
  console.log(`tracked-file safety check passed: ${files.length} file(s)`);
}
