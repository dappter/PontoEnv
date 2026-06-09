import React, { memo } from 'react';
import { Transaction, FilterState } from '../types';
import TransactionItem from './TransactionItem';
import EmptyState from './EmptyState';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
  filter: FilterState;
  onResetFilter: () => void;
}

const DEFAULT_FILTER: FilterState = {
  type: 'all',
  category: 'all',
  search: '',
  dateFrom: '',
  dateTo: '',
  sortOrder: 'newest',
};

function isFiltered(filter: FilterState): boolean {
  return (
    filter.type !== 'all' ||
    filter.category !== 'all' ||
    filter.search !== '' ||
    filter.dateFrom !== '' ||
    filter.dateTo !== ''
  );
}

function humanDate(isoDate: string): string {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  if (isoDate === todayStr) return 'Hoje';
  if (isoDate === yStr) return 'Ontem';

  const [year, month, day] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    .format(new Date(year, month - 1, day));
}

const TransactionList = memo(function TransactionList({ transactions, onRemove, filter, onResetFilter }: Props) {
  if (transactions.length === 0) {
    return <EmptyState hasFilter={isFiltered(filter)} onReset={onResetFilter} />;
  }

  // Agrupa por data (respeitando a ordem do array — já ordenado pelo hook)
  const grouped: Record<string, Transaction[]> = {};
  const dateOrder: string[] = [];

  for (const tx of transactions) {
    if (!grouped[tx.date]) {
      grouped[tx.date] = [];
      dateOrder.push(tx.date);
    }
    grouped[tx.date].push(tx);
  }

  return (
    <div className="px-4 pb-28 space-y-5 mt-4 max-w-2xl mx-auto">
      {dateOrder.map((date) => (
        <div key={date}>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {humanDate(date)}
            </p>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="space-y-2">
            {grouped[date].map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onRemove={onRemove} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default TransactionList;
