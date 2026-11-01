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
