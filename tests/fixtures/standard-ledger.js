import { seededRandom } from '../helpers/seeded.js';

const source = (id, name, type, openingBalance) => ({ id, name, type, openingBalance, createdAt: '2025-11-01T07:00:00.000Z', archived: false });

export function standardLedger(seed = 20261101) {
  const random = seededRandom(seed);
  const sources = [
    source('cash', 'Cash wallet', 'cash', 1200000),
    source('bank', 'Main bank', 'bank', 8500000),
    source('nayapay', 'NayaPay', 'wallet', 850000),
    source('easypaisa', 'Easypaisa', 'wallet', 320000),
    source('savings', 'Savings account', 'bank', 2000000),
    source('donations', 'Donation wallet', 'wallet', 100000)
  ];
  const transactions = [];
  for (let month = 0; month < 12; month += 1) {
    transactions.push({ id: `income-${month}`, type: 'income', amount: 1800000 + Math.floor(random() * 400000), sourceId: 'bank', occurredAt: `202${5 + Math.floor(month / 2)}-${String((month % 12) + 1).padStart(2, '0')}-01T08:00:00.000Z`, createdAt: `2025-${String((month % 12) + 1).padStart(2, '0')}-01T08:00:00.000Z`, category: null });
    transactions.push({ id: `expense-${month}`, type: 'expense', amount: 45000 + Math.floor(random() * 30000), sourceId: 'cash', occurredAt: `2025-${String((month % 12) + 1).padStart(2, '0')}-12T12:00:00.000Z`, createdAt: `2025-${String((month % 12) + 1).padStart(2, '0')}-12T12:00:00.000Z`, category: month % 2 ? 'Food' : 'Transport' });
    transactions.push({ id: `transfer-${month}`, type: 'transfer', amount: 250000, sourceId: 'bank', destinationId: 'cash', occurredAt: `2025-${String((month % 12) + 1).padStart(2, '0')}-05T12:00:00.000Z`, createdAt: `2025-${String((month % 12) + 1).padStart(2, '0')}-05T12:00:00.000Z`, category: null });
  }
  return {
    schemaVersion: 1,
    metadata: { createdAt: '2025-11-01T07:00:00.000Z', updatedAt: '2026-11-01T07:00:00.000Z', revision: 12 },
    settings: { baseCurrency: 'PKR', displayCurrency: 'PKR', currency: 'PKR', locale: 'en-PK', fxRates: { rates: { PKR: 1, USD: 1 / 280, EUR: 1 / 300 }, provider: 'deterministic fixture', retrievedAt: '2026-11-01T07:00:00.000Z' } },
    sources, transactions, reconciliations: [], cashAdjustments: [], categories: ['Food', 'Transport', 'Education', 'Entertainment'].map((name, index) => ({ id: `category-${index}`, name, archived: false })),
    allocations: [{ id: 'allocation-savings', name: 'General savings', mode: 'virtual', percent: 20, base: 'total money' }],
    allocationMovements: [], goals: [{ id: 'goal-laptop', name: 'New laptop', target: 33600000, targetBaseMinor: 33600000, targetOriginalMinor: 120000, targetCurrency: 'USD', current: 8400000, archived: false }],
    budgets: [{ id: 'budget-food', name: 'Food', limit: 150000, category: 'Food' }], recurring: [], templates: [], snapshots: []
  };
}
