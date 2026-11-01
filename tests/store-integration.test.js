import test from 'node:test';
import assert from 'node:assert/strict';
import { standardLedger } from './fixtures/standard-ledger.js';

function installStorage() {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { addEventListener() {} };
  return values;
}

test('store reconciles digital balances and preserves an import round trip', async () => {
  installStorage();
  const { createStore } = await import('../js/core/store.js');
  const store = createStore();
  store.importState(standardLedger());
  const before = store.state.metadata.revision;
  store.reconcile('bank', 9000000);
  assert.equal(store.state.sources.find(source => source.id === 'bank').lastConfirmedBalance, 9000000);
  assert.ok(store.state.metadata.revision > before);
  const exported = JSON.parse(localStorage.getItem('personal-finance.ledger.v1'));
  installStorage();
  const restored = createStore();
  restored.importState(exported);
  assert.equal(restored.state.sources.length, 6);
  assert.equal(restored.state.goals[0].targetCurrency, 'USD');
});

test('failed mutations are atomic and do not increment revision', async () => {
  installStorage();
  const { createStore } = await import('../js/core/store.js');
  const store = createStore();
  store.importState(standardLedger());
  const before = JSON.stringify(store.state);
  const revision = store.state.metadata.revision;
  assert.throws(() => store.addTransaction({ type: 'expense', amount: 999999999, sourceId: 'cash' }), /Insufficient funds/);
  assert.equal(JSON.stringify(store.state), before);
  assert.equal(store.state.metadata.revision, revision);
});

test('allocation confirmation records movement and deducts physical source', async () => {
  installStorage();
  const { createStore } = await import('../js/core/store.js');
  const store = createStore();
  const state = standardLedger();
  state.allocations = [{
    id: 'allocation-physical',
    name: 'Daily groceries',
    mode: 'physical',
    amount: 10000,
    frequency: 'daily',
    startDate: '2020-01-01',
    nextDueAt: '2020-01-01T00:00:00.000Z',
    sourceId: 'cash',
    confirmationMode: 'manual'
  }];
  store.importState(state);
  const before = store.state.sources.find(source => source.id === 'cash');
  const beforeBalance = before.openingBalance;
  store.confirmAllocation('allocation-physical', 10000, 'cash', new Date('2020-01-01T12:00:00.000Z'));
  assert.equal(store.state.allocationMovements.at(-1).amount, 10000);
  assert.equal(store.state.transactions.at(-1).note, 'Allocation: Daily groceries');
  assert.equal(store.state.sources.find(source => source.id === 'cash').openingBalance, beforeBalance);
  assert.equal(store.state.transactions.at(-1).type, 'expense');
});

test('automatic physical allocation confirmation posts the scheduled expense', async () => {
  installStorage();
  const { createStore } = await import('../js/core/store.js');
  const store = createStore();
  const state = standardLedger();
  state.allocations = [{
    id: 'allocation-automatic',
    name: 'Automatic rent',
    mode: 'physical',
    amount: 10000,
    frequency: 'weekly',
    startDate: '2020-01-01',
    nextDueAt: '2020-01-01T00:00:00.000Z',
    sourceId: 'cash',
    confirmationMode: 'automatic'
  }];
  store.importState(state);
  store.confirmAllocation('allocation-automatic', 10000, 'cash', new Date('2020-01-01T12:00:00.000Z'));
  assert.equal(store.state.transactions.at(-1).note, 'Allocation: Automatic rent');
  assert.equal(store.state.allocationMovements.at(-1).sourceId, 'cash');
  assert.notEqual(store.state.allocations[0].nextDueAt, '2020-01-01T00:00:00.000Z');
});
