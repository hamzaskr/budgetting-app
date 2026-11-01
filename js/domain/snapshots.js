import { sourceBalance, totalBalance } from './ledger.js';

export function monthKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function buildSnapshot(state, key) {
  const transactions = state.transactions.filter(tx => tx.occurredAt.slice(0, 7) === key);
  const sourceBalances = state.sources.filter(source => !source.archived).map(source => ({
    sourceId: source.id,
    balance: sourceBalance(state, source.id)
  }));
  return {
    id: crypto.randomUUID(),
    month: key,
    createdAt: new Date().toISOString(),
    totalMoney: totalBalance(state),
    sourceBalances,
    recordedIncome: transactions.filter(tx => tx.type === 'income').reduce((n, tx) => n + tx.amount, 0),
    recordedExpenses: transactions.filter(tx => tx.type === 'expense').reduce((n, tx) => n + tx.amount, 0),
    revision: state.metadata.revision
  };
}

export function generateMissingSnapshots(state, now = new Date()) {
  const current = monthKey(now);
  const keys = new Set((state.snapshots ?? []).map(snapshot => snapshot.month));
  const start = new Date(state.metadata.createdAt);
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  while (cursor < end) {
    const key = monthKey(cursor);
    if (!keys.has(key)) state.snapshots.push(buildSnapshot(state, key));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return state.snapshots.filter(snapshot => snapshot.month !== current).sort((a, b) => b.month.localeCompare(a.month));
}
