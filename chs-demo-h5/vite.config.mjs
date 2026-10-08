import { defineConfig, loadEnv } from 'vite';
import uniModule from '@dcloudio/vite-plugin-uni';
const uni = uniModule.default ?? uniModule;
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const target = env.VITE_API_PROXY_TARGET;
  return {
    plugins: [uni()],
    resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
    server: target
      ? {
          proxy: {
            '/api': { changeOrigin: true, target },
          },
        }
      : undefined,
  };
});
