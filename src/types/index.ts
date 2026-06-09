export type TransactionType = 'income' | 'expense';

export type Category =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'gift'
  | 'food'
  | 'transport'
  | 'health'
  | 'education'
  | 'leisure'
  | 'housing'
  | 'clothing'
  | 'other';

export type SortOrder =
  | 'newest'
  | 'oldest'
  | 'highest'
  | 'lowest';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  date: string; // ISO date string YYYY-MM-DD
  createdAt: number;
}

export interface FilterState {
  type: 'all' | TransactionType;
  category: Category | 'all';
  search: string;
  dateFrom: string;
  dateTo: string;
  sortOrder: SortOrder;
}

export interface Summary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface ExecutiveSummary {
  biggestIncome: Transaction | null;
  biggestExpense: Transaction | null;
  transactionCount: number;
  avgTicket: number;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface CategoryInsight {
  category: Category;
  amount: number;
  percentage: number;
}

export interface InsightData {
  topCategory: CategoryInsight | null;
  breakdown: CategoryInsight[];
  warnings: string[];
}
