import { englishNav, englishSidebar, rootNav, rootSidebar } from './navigation.mjs';
import { versions } from './versions.mjs';

const currentVersion = (versions.find((item) => item.latest) ?? versions[0]).version;

export default {
  title: 'Continue Harness',
  description: '需求到验收的闭环、证据追溯与项目上下文恢复',
  lang: 'zh-CN',
  // 每个 locale 的 themeConfig 会覆盖顶层 themeConfig。
  // VitePress 1.x 在 resolveSiteDataByRoute 中按 ...locales[localeIndex].themeConfig 合并，
  // 而不是读取 themeConfig.locales；语言切换器读取的是此处的 label。
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: { nav: rootNav, sidebar: rootSidebar }
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: { nav: englishNav, sidebar: englishSidebar }
    }
  },
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['meta', { name: 'theme-color', content: '#2f6f73' }]
  ],
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    // 顶层 nav/sidebar 是 default locale 的兜底；导航唯一定义在 navigation.mjs。
    nav: rootNav,
    sidebar: rootSidebar,
    outline: {
      level: [2, 3]
    },
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Business-neutral by design. Project-owned by default.',
      copyright: `Continue Harness ${currentVersion}`
    }
  }
};
