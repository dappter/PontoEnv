import { Transaction } from '../types';
import { CATEGORY_LABELS } from './constants';

/** Converte um array de transações em um arquivo CSV e dispara o download. */
export function exportToCSV(transactions: Transaction[]): void {
  if (transactions.length === 0) return;

  const headers = ['Data', 'Tipo', 'Categoria', 'Descrição', 'Valor (R$)'];

  const rows = transactions.map((tx) => [
    tx.date,
    tx.type === 'income' ? 'Receita' : 'Despesa',
    CATEGORY_LABELS[tx.category],
    `"${tx.description.replace(/"/g, '""')}"`,
    tx.amount.toFixed(2).replace('.', ','),
  ]);

  const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');

  // BOM para compatibilidade com Excel em pt-BR
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const now = new Date();
  const filename = `pontoenv-finance_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
