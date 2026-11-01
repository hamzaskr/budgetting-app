import test from 'node:test';
import assert from 'node:assert/strict';
import { standardLedger } from './fixtures/standard-ledger.js';

test('fixture IDs are safe for HTML data attributes', () => {
  const state = standardLedger();
  for (const source of state.sources) assert.match(source.id, /^[A-Za-z0-9_-]{1,100}$/);
  for (const transaction of state.transactions) assert.match(transaction.id, /^[A-Za-z0-9_-]{1,100}$/);
});

test('store rejects imported markup-bearing identifiers before persistence', async () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { addEventListener() {} };
  const { createStore } = await import('../js/core/store.js');
  const backup = standardLedger();
  backup.sources[0].id = '"><img src=x onerror=alert(1)>';
  assert.throws(() => createStore().importState(backup), /invalid financial source/);
  const goalBackup = standardLedger();
  goalBackup.goals[0].id = '"><svg onload=alert(1)>';
  assert.throws(() => createStore().importState(goalBackup), /invalid goals record/);
});

test('store keeps archived sources inactive and preserves overfunded goal movements', async () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const { createStore } = await import('../js/core/store.js');
  const store = createStore();
  const backup = standardLedger();
  store.importState(backup);
  store.archiveSource('cash');
  assert.throws(() => store.addTransaction({ type: 'income', amount: 100, sourceId: 'cash' }), /active source/);
  store.contributeGoal('goal-laptop', 40000000);
  assert.equal(store.state.goals.find(goal => goal.id === 'goal-laptop').current, 48400000);
});
