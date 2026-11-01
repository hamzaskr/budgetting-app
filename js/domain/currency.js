export const CURRENCIES = {
  PKR: { code: 'PKR', name: 'Pakistani rupee', minorDigits: 2 },
  USD: { code: 'USD', name: 'US dollar', minorDigits: 2 },
  EUR: { code: 'EUR', name: 'Euro', minorDigits: 2 },
  GBP: { code: 'GBP', name: 'British pound', minorDigits: 2 },
  AED: { code: 'AED', name: 'UAE dirham', minorDigits: 2 },
  SAR: { code: 'SAR', name: 'Saudi riyal', minorDigits: 2 },
  CAD: { code: 'CAD', name: 'Canadian dollar', minorDigits: 2 },
  AUD: { code: 'AUD', name: 'Australian dollar', minorDigits: 2 },
  JPY: { code: 'JPY', name: 'Japanese yen', minorDigits: 0 },
  BHD: { code: 'BHD', name: 'Bahraini dinar', minorDigits: 3 }
};

export const currencyList = () => Object.values(CURRENCIES);
export const currencyMeta = code => CURRENCIES[code] || CURRENCIES.PKR;
export const currencyDigits = code => currencyMeta(code).minorDigits;
export const currencyFactor = code => 10 ** currencyDigits(code);

export function parseCurrency(value, code = 'PKR') {
  const digits = currencyDigits(code);
  const text = String(value ?? '').trim().replace(/,/g, '');
  const pattern = digits ? new RegExp(`^\\d+(\\.\\d{1,${digits}})?$`) : /^\d+$/;
  if (!pattern.test(text)) throw new Error(`Enter a valid ${code} amount.`);
  const [whole, fraction = ''] = text.split('.');
  const minor = Number(whole) * currencyFactor(code) + Number((fraction + '0'.repeat(digits)).slice(0, digits) || 0);
  if (!Number.isSafeInteger(minor)) throw new Error('Amount is too large.');
  return minor;
}

export function formatCurrency(minor, code = 'PKR', locale = 'en-PK') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: code, minimumFractionDigits: currencyDigits(code), maximumFractionDigits: currencyDigits(code) }).format(minor / currencyFactor(code));
}

export function convertMinor(minor, from, to, rates) {
  if (from === to) return Math.round(minor);
  const fromRate = from === 'PKR' ? 1 : Number(rates?.[from]);
  const toRate = to === 'PKR' ? 1 : Number(rates?.[to]);
  if (!Number.isFinite(fromRate) || fromRate <= 0 || !Number.isFinite(toRate) || toRate <= 0) throw new Error(`No usable exchange rate for ${from} to ${to}.`);
  const major = (minor / currencyFactor(from)) * (toRate / fromRate);
  const result = Math.round(major * currencyFactor(to));
  if (!Number.isSafeInteger(result)) throw new Error('Converted amount is too large.');
  return result;
}
