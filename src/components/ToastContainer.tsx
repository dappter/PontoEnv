import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '../types';

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const iconMap: Record<ToastType['type'], React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

const styleMap: Record<ToastType['type'], string> = {
  success: 'bg-success-500 text-white shadow-glow-success',
  error:   'bg-danger-500 text-white shadow-glow-danger',
  info:    'bg-primary-600 text-white shadow-glow-primary',
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para a animação de entrada
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer select-none
        transition-all duration-300 ${styleMap[toast.type]}
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
      onClick={() => onDismiss(toast.id)}
    >
      <span className="shrink-0">{iconMap[toast.type]}</span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Fechar notificação"
        onClick={(e) => { e.stopPropagation(); onDismiss(toast.id); }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

interface ContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notificações"
      className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-xs w-full"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
