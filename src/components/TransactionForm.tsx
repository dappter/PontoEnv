import React, { useState, useEffect, useRef } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import {
  CATEGORY_LABELS,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from '../utils/constants';
import { todayISO } from '../utils/format';

interface Props {
  onAdd: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputClass =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-shadow';

export default function TransactionForm({ onAdd, onClose, onSuccess }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('food');
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState('');
  const descRef = useRef<HTMLInputElement>(null);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Autofocus no campo de descrição ao abrir
  useEffect(() => {
    const t = setTimeout(() => descRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  function handleTypeChange(t: TransactionType) {
    setType(t);
    setCategory(t === 'income' ? 'salary' : 'food');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount.replace(',', '.'));
    if (!description.trim()) return setError('Informe uma descrição.');
    if (isNaN(parsed) || parsed <= 0) return setError('Informe um valor válido maior que zero.');
    if (!date) return setError('Informe uma data.');
    setError('');
    onAdd({ type, description: description.trim(), amount: parsed, category, date });
    onSuccess?.();
    onClose();
  }

  const isIncome = type === 'income';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 animate-slide-up border-t border-slate-100 dark:border-slate-800 sm:border">
        {/* Header do modal */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Nova transação</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Toggle de tipo */}
        <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-5 p-1 bg-slate-50 dark:bg-slate-800 gap-1">
          {(['expense', 'income'] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                type === t
                  ? t === 'income'
                    ? 'bg-success-500 text-white shadow-sm'
                    : 'bg-danger-500 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {t === 'income' ? '↑ Receita' : '↓ Despesa'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Descrição */}
          <div>
            <label htmlFor="tx-description" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Descrição
            </label>
            <input
              id="tx-description"
              ref={descRef}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Almoço no restaurante"
              className={inputClass}
              autoComplete="off"
            />
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="tx-amount" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Valor (R$)
            </label>
            <input
              id="tx-amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className={inputClass}
            />
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="tx-category" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Categoria
            </label>
            <select
              id="tx-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
          </div>

          {/* Data */}
          <div>
            <label htmlFor="tx-date" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Data
            </label>
            <input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Erro */}
          {error && (
            <p className="text-xs text-danger-500 font-medium flex items-center gap-1.5 animate-fade-in">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all shadow-md active:scale-[0.98] ${
              isIncome
                ? 'bg-success-500 hover:bg-success-600 shadow-glow-success'
                : 'bg-danger-500 hover:bg-danger-600 shadow-glow-danger'
            }`}
          >
            Adicionar {isIncome ? 'receita' : 'despesa'}
          </button>
        </form>
      </div>
    </div>
  );
}
