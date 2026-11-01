export const STORAGE_KEY = 'personal-finance.ledger.v1';
export function emptyState() {
  return { schemaVersion: 1, metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), revision: 0 }, settings: { currency: 'PKR', displayCurrency: 'PKR', baseCurrency: 'PKR', locale: 'en-PK', theme: 'system', hideBalances: false, automaticRates: true, fxRates: null, defaultExpenseSourceId: null, defaultIncomeSourceId: null, defaultTransferSourceId: null, defaultTransferDestinationSourceId: null }, sources: [], transactions: [], reconciliations: [], cashAdjustments: [], categories: ['Food', 'Transport', 'Education', 'Shopping', 'Entertainment', 'Health', 'Bills and utilities', 'Personal', 'Donations', 'Other'].map(name => ({ id: crypto.randomUUID(), name, archived: false })), allocations: [], allocationMovements: [], goals: [], budgets: [], recurring: [], templates: [], snapshots: [] };
}
export function loadState() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : emptyState(); }
  catch { return emptyState(); }
}
