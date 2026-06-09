import React, { memo } from 'react';
import { FilterState, Category, TransactionType, SortOrder } from '../types';
import { CATEGORY_LABELS, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants';

interface Props {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}

const ALL_CATEGORIES: Category[] = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest',  label: 'Mais recentes' },
  { value: 'oldest',  label: 'Mais antigas' },
  { value: 'highest', label: 'Maior valor' },
  { value: 'lowest',  label: 'Menor valor' },
];

const TYPE_OPTIONS: { value: FilterState['type']; label: string }[] = [
  { value: 'all',     label: 'Todos' },
  { value: 'income',  label: 'Receitas' },
  { value: 'expense', label: 'Despesas' },
];

const inputClass =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-shadow';

const FilterBar = memo(function FilterBar({ filter, onChange }: Props) {
  const visibleCategories =
    filter.type === 'income'
      ? INCOME_CATEGORIES
      : filter.type === 'expense'
      ? EXPENSE_CATEGORIES
      : ALL_CATEGORIES;

  const set = (partial: Partial<FilterState>) => onChange({ ...filter, ...partial });

  return (
    <div className="px-4 pt-4 pb-2 space-y-3 max-w-2xl mx-auto">
      {/* Linha 1: Busca */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          value={filter.search}
          onChange={(e) => set({ search: e.target.value })}
          placeholder="Buscar por descrição..."
          className={`${inputClass} pl-9`}
          aria-label="Buscar transações"
        />
      </div>

      {/* Linha 2: Datas + Ordenação */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            De
          </label>
          <input
            type="date"
            value={filter.dateFrom}
            onChange={(e) => set({ dateFrom: e.target.value })}
            className={inputClass}
            aria-label="Data inicial"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Até
          </label>
          <input
            type="date"
            value={filter.dateTo}
            onChange={(e) => set({ dateTo: e.target.value })}
            className={inputClass}
            aria-label="Data final"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Ordem
          </label>
          <select
            value={filter.sortOrder}
            onChange={(e) => set({ sortOrder: e.target.value as SortOrder })}
            className={inputClass}
            aria-label="Ordenar por"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pills de tipo */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filtrar por tipo">
        {TYPE_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => set({ type: value as FilterState['type'], category: 'all' })}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              filter.type === value
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pills de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filtrar por categoria">
        <button
          onClick={() => set({ category: 'all' })}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            filter.category === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Todas
        </button>
        {visibleCategories.map((c) => (
          <button
            key={c}
            onClick={() => set({ category: c })}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              filter.category === c
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>
    </div>
  );
});

export default FilterBar;
