import React, { useState, useCallback } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { useDarkMode } from './hooks/useDarkMode';
import { useToast } from './hooks/useToast';
import { exportToCSV } from './utils/export';
import { FilterState } from './types';

import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';
import TransactionForm from './components/TransactionForm';
import ToastContainer from './components/ToastContainer';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import InsightsPanel from './components/InsightsPanel';

type Tab = 'transactions' | 'analysis' | 'dashboard';

const DEFAULT_FILTER: FilterState = {
  type: 'all',
  category: 'all',
  search: '',
  dateFrom: '',
  dateTo: '',
  sortOrder: 'newest',
};

export default function App() {
  const {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    addTransaction,
    removeTransaction,
    summary,
    categoryBreakdown,
    executiveSummary,
  } = useTransactions();

  const { isDark, toggle: toggleDark } = useDarkMode();
  const { toasts, success, error: toastError, dismiss } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState<Tab>('transactions');

  const handleRemove = useCallback(
    (id: string) => {
      removeTransaction(id);
      toastError('Transação removida.');
    },
    [removeTransaction, toastError]
  );

  const handleExport = useCallback(() => {
    if (transactions.length === 0) {
      toastError('Nenhuma transação para exportar.');
      return;
    }
    exportToCSV(transactions);
    success(`${transactions.length} transações exportadas com sucesso!`);
  }, [transactions, success, toastError]);

  const handleResetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
  }, [setFilter]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'transactions', label: '📋 Extrato' },
    { id: 'analysis',    label: '📊 Análise' },
    { id: 'dashboard',   label: '🚀 Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-base-50 dark:bg-base-900 font-sans">
      {/* Header */}
      <Header
        isDark={isDark}
        onToggleDark={toggleDark}
        onNewTransaction={() => setShowForm(true)}
        onExportCSV={handleExport}
      />

      {/* Conteúdo principal */}
      <main className="max-w-2xl mx-auto">
        {/* Cards de resumo */}
        <SummaryCards summary={summary} />

        {/* Abas */}
        <div className="mx-4 mt-4 mb-1 flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-1 gap-1">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              id={`tab-${id}`}
              onClick={() => setTab(id)}
              className={`flex-1 py-2 text-xs font-bold tracking-wide rounded-lg transition-all active:scale-95 ${
                tab === id
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
              role="tab"
              aria-selected={tab === id}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        {tab === 'transactions' && (
          <>
            <FilterBar filter={filter} onChange={setFilter} />
            <TransactionList
              transactions={filteredTransactions}
              onRemove={handleRemove}
              filter={filter}
              onResetFilter={handleResetFilter}
            />
          </>
        )}

        {tab === 'analysis' && (
          <div className="pt-4 space-y-0">
            <CategoryChart data={categoryBreakdown} />
            <InsightsPanel transactions={transactions} />
          </div>
        )}

        {tab === 'dashboard' && (
          <div className="pt-4">
            <ExecutiveDashboard summary={executiveSummary} />
            <InsightsPanel transactions={transactions} />
          </div>
        )}
      </main>

      {/* FAB — Nova transação */}
      <button
        onClick={() => setShowForm(true)}
        id="fab-nova-transacao"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-glow-primary transition-all active:scale-95 flex items-center justify-center"
        aria-label="Nova transação"
        title="Nova transação"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Modal de formulário */}
      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onClose={() => setShowForm(false)}
          onSuccess={() => success('Transação adicionada com sucesso! 🎉')}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
