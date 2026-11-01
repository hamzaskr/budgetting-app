export const MINOR_UNITS = 100;
export function parseMoney(value) {
  const text = String(value ?? '').trim().replace(/,/g, '');
  if (!/^\d+(\.\d{1,2})?$/.test(text)) throw new Error('Enter a valid non-negative amount.');
  const [whole, fraction = ''] = text.split('.');
  const minor = Number(whole) * MINOR_UNITS + Number((fraction + '00').slice(0, 2));
  if (!Number.isSafeInteger(minor)) throw new Error('Amount is too large.');
  return minor;
}
export function formatMoney(minor, currency = 'PKR', locale = 'en-PK') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 2 }).format(minor / MINOR_UNITS);
}
export function percentage(part, total) { return total === 0 ? 0 : (part / total) * 100; }
