import React, { useState, memo } from 'react';
import { Transaction } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../utils/constants';
import { formatCurrency, formatDate } from '../utils/format';

interface Props {
  transaction: Transaction;
  onRemove: (id: string) => void;
}

const TransactionItem = memo(function TransactionItem({ transaction, onRemove }: Props) {
  const { id, description, amount, category, type, date } = transaction;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isIncome = type === 'income';

  return (
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all duration-150 hover:shadow-md animate-fade-in
      bg-white dark:bg-surface border-slate-100 dark:border-slate-700/50
      ${confirmDelete ? 'border-danger-200 dark:border-danger-800/50 bg-danger-50/50 dark:bg-danger-900/10' : ''}
    `}>
      {/* Ícone da categoria */}
      <div
        className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl text-lg ${
          isIncome
            ? 'bg-success-50 dark:bg-success-900/30'
            : 'bg-danger-50 dark:bg-danger-900/30'
        }`}
      >
        {CATEGORY_ICONS[category]}
      </div>

      {/* Informações */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
          {description}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {CATEGORY_LABELS[category]} · {formatDate(date)}
        </p>
      </div>

      {/* Valor + ações */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span
          className={`text-sm font-bold tabular-nums ${
            isIncome ? 'text-success-600 dark:text-success-400' : 'text-danger-500 dark:text-danger-400'
          }`}
        >
          {isIncome ? '+' : '-'} {formatCurrency(amount)}
        </span>

        {confirmDelete ? (
          <div className="flex gap-1 animate-scale-in">
            <button
              onClick={() => onRemove(id)}
              className="text-xs text-white bg-danger-500 hover:bg-danger-600 rounded-lg px-2.5 py-1 font-semibold transition-colors active:scale-95"
              aria-label="Confirmar exclusão"
            >
              Excluir
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg px-2.5 py-1 font-semibold transition-colors active:scale-95"
              aria-label="Cancelar exclusão"
            >
              Não
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-slate-300 dark:text-slate-600 hover:text-danger-400 dark:hover:text-danger-500 transition-colors p-0.5"
            aria-label="Remover transação"
            title="Remover transação"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default TransactionItem;
