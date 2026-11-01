import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchRates, ratesDue } from '../js/services/exchange-rates.js';

const response = payload => ({ ok: true, json: async () => payload });

test('validates provider responses and filters invalid rates', async () => {
  const result = await fetchRates(async () => response({ result: 'success', base_code: 'PKR', rates: { USD: 0.0035, EUR: '0.003', BAD: -1, NAN: 'x' } }));
  assert.equal(result.rates.PKR, 1);
  assert.equal(result.rates.USD, 0.0035);
  assert.equal(result.rates.BAD, undefined);
});

test('rejects provider failures, wrong bases, and malformed payloads', async () => {
  await assert.rejects(() => fetchRates(async () => ({ ok: false, status: 503 })), /503/);
  await assert.rejects(() => fetchRates(async () => response({ result: 'success', base_code: 'USD', rates: {} })), /invalid response/);
  await assert.rejects(() => fetchRates(async () => response(null)), /invalid response/);
});

test('automatic refresh due checks respect manual mode and cache expiry', () => {
  assert.equal(ratesDue({ automaticRates: false }), false);
  assert.equal(ratesDue({ automaticRates: true, fxRates: { retrievedAt: new Date().toISOString(), nextUpdateAt: Date.now() + 10000 } }), false);
  assert.equal(ratesDue({ automaticRates: true, fxRates: { nextUpdateAt: Date.now() - 1 } }), true);
});
