// 文档站版本列表。
//
// 新增版本时：
//   1. 用 VitePress 的 base 把该版本构建到对应子路径（例如 base: '/v0.2/'）；
//   2. 在下方数组追加一项，并把最新版本的 latest 设为 true。
//
// 只有一个版本时，导航渲染为普通文字；两个及以上时自动变为下拉菜单。
export const versions = [
  { version: '0.1.0', label: 'v0.1.0', link: '/', latest: true }
];

export function versionNav() {
  const latest = versions.find((item) => item.latest) ?? versions[0];
  if (versions.length <= 1) {
    return { text: latest.label, link: latest.link };
  }
  return {
    text: latest.label,
    items: versions.map((item) => ({
      text: item.latest ? `${item.label} (latest)` : item.label,
      link: item.link
    }))
  };
}
