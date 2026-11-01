import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSnapshot, monthKey } from '../js/domain/snapshots.js';

test('builds a month snapshot from recorded activity and source balances', () => {
  const state = {
    metadata: { revision: 3 },
    sources: [{ id: 'cash', type: 'cash', openingBalance: 10000, createdAt: '2026-01-01', archived: false }],
    transactions: [
      { type: 'income', amount: 5000, sourceId: 'cash', occurredAt: '2026-01-15', createdAt: '2026-01-15' },
      { type: 'expense', amount: 1200, sourceId: 'cash', occurredAt: '2026-01-20', createdAt: '2026-01-20' }
    ],
    reconciliations: [],
    cashAdjustments: [],
    snapshots: []
  };
  const snapshot = buildSnapshot(state, '2026-01');
  assert.equal(snapshot.recordedIncome, 5000);
  assert.equal(snapshot.recordedExpenses, 1200);
  assert.equal(snapshot.totalMoney, 13800);
  assert.equal(monthKey('2026-01-20'), '2026-01');
});
