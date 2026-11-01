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
