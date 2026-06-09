import React, { memo } from 'react';
import { ExecutiveSummary, Transaction } from '../types';
import { formatCurrency } from '../utils/format';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../utils/constants';

interface Props {
  summary: ExecutiveSummary;
}

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

function MetricCard({ label, value, sub, icon, colorClass, bgClass }: MetricCardProps) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <span className={`w-7 h-7 flex items-center justify-center rounded-lg ${bgClass} ${colorClass}`}>
          {icon}
        </span>
      </div>
      <p className={`text-xl font-extrabold tabular-nums leading-tight ${colorClass}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{sub}</p>}
    </div>
  );
}

function txSub(tx: Transaction | null): string | undefined {
  if (!tx) return undefined;
  return `${CATEGORY_ICONS[tx.category]} ${tx.description}`;
}

const ExecutiveDashboard = memo(function ExecutiveDashboard({ summary }: Props) {
  const { biggestIncome, biggestExpense, transactionCount, avgTicket } = summary;

  const metrics: MetricCardProps[] = [
    {
      label: 'Maior receita',
      value: biggestIncome ? formatCurrency(biggestIncome.amount) : '—',
      sub: txSub(biggestIncome),
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      colorClass: 'text-success-500',
      bgClass:    'bg-success-50 dark:bg-success-900/30',
    },
    {
      label: 'Maior despesa',
      value: biggestExpense ? formatCurrency(biggestExpense.amount) : '—',
      sub: txSub(biggestExpense),
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </svg>
      ),
      colorClass: 'text-danger-500',
      bgClass:    'bg-danger-50 dark:bg-danger-900/30',
    },
    {
      label: 'Transações',
      value: String(transactionCount),
      sub: transactionCount === 1 ? '1 registro' : `${transactionCount} registros`,
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ),
      colorClass: 'text-primary-600 dark:text-primary-400',
      bgClass:    'bg-primary-50 dark:bg-primary-900/30',
    },
    {
      label: 'Ticket médio',
      value: avgTicket > 0 ? formatCurrency(avgTicket) : '—',
      sub: 'por transação',
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      colorClass: 'text-purple-600 dark:text-purple-400',
      bgClass:    'bg-purple-50 dark:bg-purple-900/30',
    },
  ];

  return (
    <div className="mx-4 mb-4">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
        📊 Dashboard executivo
      </p>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </div>
  );
});

export default ExecutiveDashboard;
