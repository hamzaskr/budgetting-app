import { formatCurrency, convertMinor } from '../domain/currency.js';
export function money(value, state, currency = state.settings.displayCurrency || state.settings.currency) {
  if (state.settings.hideBalances) return '••••';
  const base = state.settings.baseCurrency || 'PKR';
  try {
    const converted = currency === base ? value : convertMinor(value, base, currency, state.settings.fxRates?.rates);
    return formatCurrency(converted, currency, state.settings.locale);
  } catch {
    return formatCurrency(value, base, state.settings.locale);
  }
}
export function date(value) { return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value)); }
