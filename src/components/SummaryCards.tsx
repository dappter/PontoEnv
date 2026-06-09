import React, { memo } from 'react';
import { Summary } from '../types';
import { formatCurrency } from '../utils/format';

interface Props {
  summary: Summary;
}

const SummaryCards = memo(function SummaryCards({ summary }: Props) {
  const { balance, totalIncome, totalExpense } = summary;
  const isPositive = balance >= 0;

  return (
    <section className="px-4 pt-5 pb-2 space-y-3 max-w-2xl mx-auto">
      {/* Card de Saldo — hero */}
      <div
        className={`rounded-2xl p-5 text-white shadow-lg relative overflow-hidden ${
          isPositive
            ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-glow-primary'
            : 'bg-gradient-to-br from-danger-500 via-danger-600 to-danger-700 shadow-glow-danger'
        }`}
      >
        {/* Decoração de fundo */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-75">Saldo atual</p>
          <p className="mt-1.5 text-4xl font-extrabold tabular-nums tracking-tight">
            {formatCurrency(balance)}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs opacity-70">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white/90 ${
                isPositive ? 'bg-white/15' : 'bg-white/15'
              }`}
            >
              {isPositive ? '↑ Saldo positivo' : '↓ Saldo negativo'}
            </span>
          </div>
        </div>
      </div>

      {/* Receita & Despesa */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-success-50 dark:bg-success-900/30 text-success-600 dark:text-success-400">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Receitas
            </span>
          </div>
          <p className="text-xl font-extrabold text-success-600 dark:text-success-400 tabular-nums">
            {formatCurrency(totalIncome)}
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-danger-50 dark:bg-danger-900/30 text-danger-500 dark:text-danger-400">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Despesas
            </span>
          </div>
          <p className="text-xl font-extrabold text-danger-500 dark:text-danger-400 tabular-nums">
            {formatCurrency(totalExpense)}
          </p>
        </div>
      </div>
    </section>
  );
});

export default SummaryCards;
