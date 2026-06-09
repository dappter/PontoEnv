import { Transaction, InsightData, CategoryInsight, Category } from '../types';
import { CATEGORY_LABELS } from './constants';

/** Calcula insights inteligentes a partir das transações. */
export function computeInsights(transactions: Transaction[]): InsightData {
  const expenses = transactions.filter((tx) => tx.type === 'expense');
  const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

  if (expenses.length === 0) {
    return { topCategory: null, breakdown: [], warnings: [] };
  }

  // Agrupa por categoria
  const map = new Map<string, number>();
  expenses.forEach((tx) => {
    map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
  });

  const breakdown: CategoryInsight[] = Array.from(map.entries())
    .map(([category, amount]) => ({
      category: category as Category,
      amount,
      percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const topCategory = breakdown[0] ?? null;

  // Gera avisos automáticos
  const warnings: string[] = [];

  if (topCategory && topCategory.percentage >= 40) {
    const label = CATEGORY_LABELS[topCategory.category];
    warnings.push(
      `Você está gastando ${topCategory.percentage.toFixed(0)}% do seu orçamento em ${label}. Considere revisar esses gastos.`
    );
  }

  // Aviso se há mais de 3 categorias com mais de 20%
  const heavyCategories = breakdown.filter((c) => c.percentage >= 20);
  if (heavyCategories.length >= 3) {
    warnings.push('Seus gastos estão muito distribuídos em categorias caras. Tente focar em cortar uma delas.');
  }

  // Aviso se categoria alimentação domina
  const foodEntry = breakdown.find((c) => c.category === 'food');
  if (foodEntry && foodEntry.percentage >= 35) {
    warnings.push('Você gastou mais com Alimentação este mês. Experimente cozinhar em casa com mais frequência.');
  }

  // Aviso se lazer está alto
  const leisureEntry = breakdown.find((c) => c.category === 'leisure');
  if (leisureEntry && leisureEntry.percentage >= 25) {
    warnings.push('Gastos com Lazer estão acima de 25% das despesas. Vale revisar esse hábito.');
  }

  return { topCategory, breakdown, warnings };
}
