export function sourceBalance(state, sourceId) {
  const source = state.sources.find(item => item.id === sourceId);
  if (!source) return 0;
  const transactions = state.transactions ?? [];
  if (source.type === 'cash') return source.openingBalance + transactions.reduce((sum, tx) => sum + (tx.sourceId === sourceId ? (tx.type === 'income' ? tx.amount : tx.type === 'expense' ? -tx.amount : 0) : 0) + (tx.type === 'transfer' && tx.destinationId === sourceId ? tx.amount : 0) - (tx.type === 'transfer' && tx.sourceId === sourceId ? tx.amount : 0), 0) + (state.cashAdjustments ?? []).filter(item => item.sourceId === sourceId).reduce((sum, item) => sum + item.difference, 0);
  const latest = (state.reconciliations ?? []).filter(item => item.sourceId === sourceId).sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))[0];
  const baseline = latest?.balance ?? source.openingBalance;
  const checkpoint = latest?.occurredAt ?? source.createdAt;
  return baseline + transactions.filter(tx => tx.createdAt > checkpoint).reduce((sum, tx) => sum + (tx.sourceId === sourceId ? (tx.type === 'income' ? tx.amount : tx.type === 'expense' ? -tx.amount : 0) : 0) + (tx.type === 'transfer' && tx.destinationId === sourceId ? tx.amount : 0) - (tx.type === 'transfer' && tx.sourceId === sourceId ? tx.amount : 0), 0);
}
export function totalBalance(state) { return state.sources.filter(s => !s.archived).reduce((sum, s) => sum + sourceBalance(state, s.id), 0); }
