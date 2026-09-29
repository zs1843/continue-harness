export function formatCurrency(
  value: number,
  currency = 'CNY',
  locale = 'zh-CN',
): string {
  return new Intl.NumberFormat(locale, { currency, style: 'currency' }).format(
    value,
  );
}

export function formatDate(
  value: string | number | Date,
  locale = 'zh-CN',
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale).format(date);
}
