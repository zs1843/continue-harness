import { spawn } from 'node:child_process';

const timeoutMs = 60_000;
const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const child = spawn(
  command,
  ['dev:h5', '--host', '127.0.0.1', '--port', '5173'],
  {
    env: { ...process.env, BROWSER: 'none' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let output = '';
let settled = false;

function finish(code, message) {
  if (settled) return;
  settled = true;
  child.kill('SIGTERM');
  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
    console.error(output.slice(-4000));
  }
  process.exit(code);
}

const timer = setTimeout(
  () => finish(1, 'dev:h5 未在限定时间内进入 ready 状态'),
  timeoutMs,
);

function collect(chunk) {
  output += String(chunk);
  if (
    /Local:|ready in|ready on|localhost|127\.0\.0\.1|DONE\s+Compiled/i.test(
      output,
    )
  ) {
    clearTimeout(timer);
    finish(0, 'dev:h5 已进入 ready 状态');
  }
}

child.stdout.on('data', collect);
child.stderr.on('data', collect);
child.on('error', (error) => {
  clearTimeout(timer);
  finish(1, `dev:h5 启动失败：${error.message}`);
});
child.on('exit', (code) => {
  clearTimeout(timer);
  if (!settled) finish(code === 0 ? 0 : 1, `dev:h5 进程退出：${code}`);
});
