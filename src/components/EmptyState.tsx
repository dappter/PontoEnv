import React from 'react';

interface Props {
  hasFilter?: boolean;
  onReset?: () => void;
}

export default function EmptyState({ hasFilter = false, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
      {/* Ilustração SVG */}
      <div className="mb-6">
        <svg
          width="120"
          height="100"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Carteira */}
          <rect x="20" y="30" width="80" height="52" rx="10" fill="#E2E8F0" className="dark:fill-slate-700" />
          <rect x="20" y="40" width="80" height="10" fill="#CBD5E1" className="dark:fill-slate-600" />
          {/* Moedas fantasmas */}
          <circle cx="60" cy="20" r="10" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          <circle cx="85" cy="15" r="7" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          <circle cx="35" cy="18" r="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          {/* Linha interna carteira */}
          <rect x="70" y="52" width="18" height="8" rx="4" fill="#CBD5E1" className="dark:fill-slate-600" />
          {/* Ponto de interrogação */}
          <text x="55" y="72" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="700" fill="#94A3B8" className="dark:fill-slate-500">?</text>
        </svg>
      </div>

      <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-1">
        {hasFilter ? 'Nenhum resultado encontrado' : 'Nenhuma transação ainda'}
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
        {hasFilter
          ? 'Tente ajustar os filtros ou a busca para encontrar o que procura.'
          : 'Adicione sua primeira receita ou despesa para começar a controlar suas finanças.'}
      </p>

      {hasFilter && onReset && (
        <button
          onClick={onReset}
          className="mt-5 px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-all active:scale-95"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
