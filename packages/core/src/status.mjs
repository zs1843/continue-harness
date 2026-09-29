export const STATUS_DISPLAY = {
  active: '已确认',
  blocked: '失败',
  conflict: '冲突',
  confirmed: '已确认',
  deprecated: '已废弃',
  done: '已实现',
  failed: '失败',
  implemented: '已实现',
  inferred: '推断',
  needs_confirmation: '待确认',
  not_applicable: '不适用',
  not_configured: '未配置',
  not_implemented: '未实现',
  passed: '通过',
  replaced: '被替代',
  superseded: '被替代',
  unimplemented: '未实现',
  verified: '已验证',
};

export function displayStatus(status) {
  return STATUS_DISPLAY[status] || status || '待确认';
}

export function localizeResult(item) {
  return {
    ...item,
    display_name: displayStatus(item.status),
  };
}
