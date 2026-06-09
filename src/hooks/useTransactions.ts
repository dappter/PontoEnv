import { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, FilterState, Summary, ExecutiveSummary, SortOrder } from '../types';
import { loadTransactions, saveTransactions } from '../services/storage';
import { generateId, todayISO } from '../utils/format';

const DEFAULT_FILTER: FilterState = {
  type: 'all',
  category: 'all',
  search: '',
  dateFrom: '',
  dateTo: '',
  sortOrder: 'newest',
};

function applySortOrder(list: Transaction[], sortOrder: SortOrder): Transaction[] {
  const copy = [...list];
  switch (sortOrder) {
    case 'newest':  return copy.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
    case 'oldest':  return copy.sort((a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt);
    case 'highest': return copy.sort((a, b) => b.amount - a.amount);
    case 'lowest':  return copy.sort((a, b) => a.amount - b.amount);
    default:        return copy;
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  // Persiste sempre que transações mudam
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = useCallback(
    (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
      const newTx: Transaction = {
        ...tx,
        id: generateId(),
        createdAt: Date.now(),
      };
      setTransactions((prev) => [newTx, ...prev]);
    },
    []
  );

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((tx) => {
      if (filter.type !== 'all' && tx.type !== filter.type) return false;
      if (filter.category !== 'all' && tx.category !== filter.category) return false;
      if (filter.search && !tx.description.toLowerCase().includes(filter.search.toLowerCase())) return false;
      if (filter.dateFrom && tx.date < filter.dateFrom) return false;
      if (filter.dateTo   && tx.date > filter.dateTo)   return false;
      return true;
    });
    return applySortOrder(filtered, filter.sortOrder);
  }, [transactions, filter]);

  const summary: Summary = useMemo(() => {
    const totalIncome = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
      });
    return Array.from(map.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const executiveSummary: ExecutiveSummary = useMemo(() => {
    const incomes  = transactions.filter((tx) => tx.type === 'income');
    const expenses = transactions.filter((tx) => tx.type === 'expense');

    const biggestIncome  = incomes.length  > 0 ? incomes.reduce((max, tx)  => tx.amount > max.amount  ? tx : max)  : null;
    const biggestExpense = expenses.length > 0 ? expenses.reduce((max, tx) => tx.amount > max.amount ? tx : max) : null;

    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTicket = transactions.length > 0 ? totalAmount / transactions.length : 0;

    return {
      biggestIncome,
      biggestExpense,
      transactionCount: transactions.length,
      avgTicket,
    };
  }, [transactions]);

  return {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    addTransaction,
    removeTransaction,
    summary,
    categoryBreakdown,
    executiveSummary,
    todayISO,
  };
}
