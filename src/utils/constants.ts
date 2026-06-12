import { Category, TransactionType } from '../types';

export const STORAGE_KEY = 'pf_transactions_v1';

export const CATEGORY_LABELS: Record<Category, string> = {
  salary: 'Salário',
  freelance: 'Freelance',
  investment: 'Investimento',
  gift: 'Presente',
  food: 'Alimentação',
  transport: 'Transporte',
  health: 'Saúde',
  education: 'Educação',
  leisure: 'Lazer',
  bill: 'Fatura',
  housing: 'Moradia',
  clothing: 'Vestuário',
  other: 'Outros',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  salary: '💼',
  freelance: '💻',
  investment: '📈',
  gift: '🎁',
  food: '🍽️',
  transport: '🚌',
  health: '❤️',
  education: '📚',
  leisure: '🎮',
  housing: '🏠',
  clothing: '👕',
  bill: '💳',
  other: '📦',
};

export const INCOME_CATEGORIES: Category[] = ['salary', 'freelance', 'investment', 'gift'];
export const EXPENSE_CATEGORIES: Category[] = [
  'food', 'transport', 'health', 'education', 'leisure', 'housing', 'clothing', 'bill', 'other',
];

export const TYPE_LABELS: Record<TransactionType, string> = {
  income: 'Receita',
  expense: 'Despesa',
};
