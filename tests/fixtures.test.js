import test from 'node:test';
import assert from 'node:assert/strict';
import { standardLedger } from './fixtures/standard-ledger.js';
import { largeTransactions } from './fixtures/large-ledger.js';
import { fixedClock, seededRandom } from './helpers/seeded.js';

test('seeded fixtures are reproducible and cover the required scenario shape', () => {
  const first = standardLedger();
  assert.deepEqual(first, standardLedger());
  assert.equal(first.sources.length, 6);
  assert.equal(first.transactions.length, 36);
  assert.equal(first.goals[0].targetCurrency, 'USD');
  assert.equal(first.allocations[0].mode, 'virtual');
});

test('seeded random data has the requested scale without uncontrolled randomness', () => {
  assert.deepEqual(Array.from({ length: 3 }, seededRandom(42)).map(value => value.toFixed(8)), ['0.25234517', '0.08812505', '0.57728120']);
  assert.equal(largeTransactions(2000).length, 2000);
});

test('fixed clock returns independent stable dates', () => {
  const clock = fixedClock();
  const first = clock.now();
  first.setFullYear(2030);
  assert.equal(clock.iso(), '2026-11-01T07:00:00.000Z');
});
