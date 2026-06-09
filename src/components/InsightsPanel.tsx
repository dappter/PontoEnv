import React, { useMemo } from 'react';
import { Transaction } from '../types';
import { computeInsights } from '../utils/insights';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../utils/constants';
import { formatCurrency } from '../utils/format';

interface Props {
  transactions: Transaction[];
}

const categoryColors = [
  'bg-primary-500',
  'bg-success-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-500',
];

export default function InsightsPanel({ transactions }: Props) {
  const insights = useMemo(() => computeInsights(transactions), [transactions]);

  if (insights.breakdown.length === 0) {
    return (
      <div className="card mx-4 mb-4 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
          💡 Insights
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-3">
          Registre despesas para ver seus insights.
        </p>
      </div>
    );
  }

  const totalExpense = insights.breakdown.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-3 mx-4 mb-4">
      {/* Avisos automáticos */}
      {insights.warnings.length > 0 && (
        <div className="space-y-2">
          {insights.warnings.map((warning, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 animate-fade-in"
            >
              <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                {warning}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Breakdown por categoria */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            💡 Gastos por categoria
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            {formatCurrency(totalExpense)} total
          </span>
        </div>

        {/* Top categoria em destaque */}
        {insights.topCategory && (
          <div className="mb-4 p-3.5 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-100 dark:border-danger-800/30">
            <p className="text-xs text-danger-600 dark:text-danger-400 font-semibold mb-1">
              🏆 Maior gasto
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <span>{CATEGORY_ICONS[insights.topCategory.category]}</span>
                {CATEGORY_LABELS[insights.topCategory.category]}
              </span>
              <div className="text-right">
                <p className="text-sm font-bold text-danger-600 dark:text-danger-400 tabular-nums">
                  {formatCurrency(insights.topCategory.amount)}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {insights.topCategory.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Barras de percentual */}
        <div className="space-y-3">
          {insights.breakdown.slice(0, 6).map(({ category, amount, percentage }, i) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                  <span>{CATEGORY_ICONS[category]}</span>
                  {CATEGORY_LABELS[category]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums w-20 text-right">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${categoryColors[i % categoryColors.length]} transition-all duration-700`}
                  style={{ width: `${Math.max(2, percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
