export function budgetSpent(transactions, budget, month) {
  return transactions.filter(transaction => transaction.type === 'expense' &&
    transaction.occurredAt.slice(0, 7) === month &&
    (!budget.category || transaction.category === budget.category)
  ).reduce((total, transaction) => total + transaction.amount, 0);
}

export function budgetPercent(spent, limit) {
  return limit > 0 ? spent / limit * 100 : 0;
}

export function allocationTarget(allocation, totalMoney) {
  if (Number.isSafeInteger(allocation.amount) && allocation.amount > 0) return allocation.amount;
  if (Number.isFinite(allocation.percent) && allocation.percent > 0) return Math.round(totalMoney * allocation.percent / 100);
  return 0;
}

export function allocationNextDue(allocation, from = new Date()) {
  if (!allocation.startDate || !['daily', 'weekly'].includes(allocation.frequency)) return null;
  const start = new Date(`${allocation.startDate}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) return null;
  const due = new Date(start);
  const fromDay = new Date(from);
  fromDay.setUTCHours(0, 0, 0, 0);
  const increment = allocation.frequency === 'daily' ? 1 : 7;
  while (due < fromDay) due.setUTCDate(due.getUTCDate() + increment);
  return due.toISOString();
}

export function allocationIsDue(allocation, now = new Date()) {
  return Boolean(allocation.nextDueAt && new Date(allocation.nextDueAt) <= now);
}
