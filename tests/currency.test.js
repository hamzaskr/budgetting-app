import test from 'node:test';
import assert from 'node:assert/strict';
import { convertMinor, currencyDigits, parseCurrency } from '../js/domain/currency.js';

const rates = { PKR: 1, USD: 1 / 280, EUR: 1 / 300 };

test('converts PKR and foreign currencies using a shared PKR rate table', () => {
  assert.equal(convertMinor(1400000, 'PKR', 'USD', rates), 5000);
  assert.equal(convertMinor(5000, 'USD', 'PKR', rates), 1400000);
  assert.equal(convertMinor(5000, 'USD', 'EUR', rates), 4667);
});

test('uses currency-specific precision and rounding', () => {
  assert.equal(currencyDigits('JPY'), 0);
  assert.equal(parseCurrency('1,234', 'JPY'), 1234);
  assert.equal(parseCurrency('1.234', 'BHD'), 1234);
  assert.throws(() => parseCurrency('1.2', 'JPY'));
});

test('rejects missing or invalid rates instead of inventing a conversion', () => {
  assert.throws(() => convertMinor(100, 'USD', 'PKR', {}), /No usable exchange rate/);
  assert.throws(() => convertMinor(100, 'USD', 'PKR', { USD: 0 }), /No usable exchange rate/);
});
