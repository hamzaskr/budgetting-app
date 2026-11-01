import test from 'node:test';
import assert from 'node:assert/strict';
import { sourceBalance, totalBalance } from '../js/domain/ledger.js';
const state = { sources: [{ id: 'cash', type: 'cash', openingBalance: 10000, createdAt: '2026-01-01' }, { id: 'bank', type: 'bank', openingBalance: 5000, createdAt: '2026-01-01' }], transactions: [{ type: 'expense', amount: 1000, sourceId: 'cash', createdAt: '2026-01-02' }, { type: 'transfer', amount: 2000, sourceId: 'cash', destinationId: 'bank', createdAt: '2026-01-03' }], reconciliations: [] };
test('derives balances and conserves transfers', () => { assert.equal(sourceBalance(state, 'cash'), 7000); assert.equal(sourceBalance(state, 'bank'), 7000); assert.equal(totalBalance({ ...state, sources: state.sources.map(s => ({ ...s, archived: false })) }), 14000); });
test('cash adjustments are explicit and affect only the counted source', () => {
  const adjusted = { ...state, cashAdjustments: [{ sourceId: 'cash', difference: 500 }] };
  assert.equal(sourceBalance(adjusted, 'cash'), 7500);
  assert.equal(sourceBalance(adjusted, 'bank'), 7000);
});
