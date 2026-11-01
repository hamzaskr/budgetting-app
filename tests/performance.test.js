import test from 'node:test';
import assert from 'node:assert/strict';
import { largeTransactions } from './fixtures/large-ledger.js';
import { sourceBalance } from '../js/domain/ledger.js';

for (const count of [2000, 10000, 50000]) {
  test(`calculates a ${count.toLocaleString()} transaction ledger`, () => {
    const state = {
      sources: [{ id: 'source-0', type: 'cash', openingBalance: 1000000000, createdAt: '2026-01-01' }],
      transactions: largeTransactions(count),
      cashAdjustments: []
    };
    const start = performance.now();
    const balance = sourceBalance(state, 'source-0');
    const elapsed = performance.now() - start;
    assert.equal(Number.isSafeInteger(balance), true);
    assert.ok(elapsed < 1000, `ledger calculation took ${elapsed.toFixed(1)}ms`);
  });
}
