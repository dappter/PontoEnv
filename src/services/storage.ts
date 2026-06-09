import { Transaction } from '../types';

const STORAGE_KEY = 'pf_transactions';
const STORAGE_VERSION = 2;

interface StoragePayload {
  version: number;
  transactions: Transaction[];
  updatedAt: number;
}

/** Carrega transações do localStorage com verificação de versão e proteção contra corrupção. */
export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateFromLegacy();

    const payload = JSON.parse(raw) as StoragePayload;

    // Valida estrutura mínima
    if (!payload || typeof payload !== 'object' || !Array.isArray(payload.transactions)) {
      console.warn('[Storage] Payload inválido — redefinindo storage.');
      return migrateFromLegacy();
    }

    return payload.transactions;
  } catch (err) {
    console.error('[Storage] Erro ao ler localStorage:', err);
    return [];
  }
}

/** Salva transações no localStorage com versão e timestamp. */
export function saveTransactions(transactions: Transaction[]): void {
  try {
    const payload: StoragePayload = {
      version: STORAGE_VERSION,
      transactions,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('[Storage] Erro ao salvar localStorage:', err);
  }
}

/** Migra dados do formato legado (v1 — array puro) para o novo formato versionado. */
function migrateFromLegacy(): Transaction[] {
  try {
    const legacyKey = 'pf_transactions_v1';
    const raw = localStorage.getItem(legacyKey);
    if (!raw) return [];

    const transactions = JSON.parse(raw) as Transaction[];
    if (!Array.isArray(transactions)) return [];

    // Salva no novo formato e remove o legado
    saveTransactions(transactions);
    localStorage.removeItem(legacyKey);
    console.info('[Storage] Migração da v1 para v2 concluída:', transactions.length, 'transações');

    return transactions;
  } catch {
    return [];
  }
}
