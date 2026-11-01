import { seededRandom } from '../helpers/seeded.js';

export function largeTransactions(count = 10000, seed = 20261101) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, index) => ({
    id: `tx-${index}`,
    type: index % 9 === 0 ? 'income' : 'expense',
    amount: 100 + Math.floor(random() * 250000),
    sourceId: 'source-0',
    category: index % 3 ? 'Food' : null,
    note: `Synthetic transaction ${index}`,
    occurredAt: `2026-${String((index % 12) + 1).padStart(2, '0')}-15T12:00:00.000Z`,
    createdAt: `2026-${String((index % 12) + 1).padStart(2, '0')}-15T12:00:00.000Z`
  }));
}
