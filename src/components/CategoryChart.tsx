import React, { memo } from 'react';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../utils/constants';
import { formatCurrency } from '../utils/format';
import { Category } from '../types';

interface CategoryEntry {
  category: string;
  amount: number;
}

interface Props {
  data: CategoryEntry[];
}

const barColors = [
  'from-primary-500 to-primary-700',
  'from-success-500 to-success-700',
  'from-amber-400 to-amber-600',
  'from-purple-500 to-purple-700',
  'from-pink-500 to-pink-700',
];

const CategoryChart = memo(function CategoryChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="card mx-4 mb-4 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
          📊 Despesas por categoria
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
          Nenhuma despesa registrada ainda.
        </p>
      </div>
    );
  }

  const max = data[0].amount;
  const total = data.reduce((s, d) => s + d.amount, 0);
  const top5 = data.slice(0, 5);

  return (
    <div className="card mx-4 mb-4 p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          📊 Despesas por categoria
        </p>
        <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
          {formatCurrency(total)} total
        </span>
      </div>
      <div className="space-y-4">
        {top5.map(({ category, amount }, i) => {
          const pct = Math.max(4, (amount / max) * 100);
          const sharePct = ((amount / total) * 100).toFixed(1);
          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                  <span>{CATEGORY_ICONS[category as Category]}</span>
                  <span>{CATEGORY_LABELS[category as Category]}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">{sharePct}%</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barColors[i % barColors.length]} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CategoryChart;
