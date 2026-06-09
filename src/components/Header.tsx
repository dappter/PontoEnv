import React from 'react';
import Logo from './Logo';

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
  onNewTransaction: () => void;
  onExportCSV: () => void;
}

export default function Header({ isDark, onToggleDark, onNewTransaction, onExportCSV }: Props) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Logo size={30} />
          <div>
            <h1 className="text-sm font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
              PontoEnv Finance
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              Controle financeiro pessoal
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Exportar CSV */}
          <button
            onClick={onExportCSV}
            title="Exportar para CSV"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-600 dark:hover:text-primary-400 transition-all active:scale-95"
            aria-label="Exportar transações para CSV"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-500 dark:hover:text-amber-400 transition-all active:scale-95"
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1"  x2="12" y2="3"  />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"   />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1"  y1="12" x2="3"  y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Nova Transação */}
          <button
            onClick={onNewTransaction}
            className="flex items-center gap-1.5 px-3.5 h-9 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-glow-primary transition-all active:scale-95"
            aria-label="Nova transação"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="hidden sm:inline">Nova</span>
          </button>
        </div>
      </div>
    </header>
  );
}
