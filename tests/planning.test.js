import test from 'node:test';
import assert from 'node:assert/strict';
import { allocationTarget, budgetPercent, budgetSpent } from '../js/domain/planning.js';

const transactions = [
  { type: 'expense', amount: 1200, category: 'Food', occurredAt: '2026-11-02T00:00:00.000Z' },
  { type: 'expense', amount: 800, category: 'Transport', occurredAt: '2026-11-03T00:00:00.000Z' },
  { type: 'expense', amount: 300, category: 'Food', occurredAt: '2026-10-03T00:00:00.000Z' },
  { type: 'income', amount: 9999, category: 'Food', occurredAt: '2026-11-04T00:00:00.000Z' }
];

test('budget spending respects category and month boundaries', () => {
  assert.equal(budgetSpent(transactions, { category: 'Food' }, '2026-11'), 1200);
  assert.equal(budgetSpent(transactions, {}, '2026-11'), 2000);
  assert.equal(budgetPercent(1200, 2000), 60);
  assert.equal(budgetPercent(10, 0), 0);
});

test('allocation targets handle fixed and percentage modes safely', () => {
  assert.equal(allocationTarget({ amount: 5000 }, 100000), 5000);
  assert.equal(allocationTarget({ percent: 15 }, 100000), 15000);
  assert.equal(allocationTarget({ percent: 0 }, 100000), 0);
});
