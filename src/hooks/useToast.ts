import { useState, useCallback, useRef } from 'react';
import { Toast, ToastType } from '../types';
import { generateId } from '../utils/format';

const TOAST_DURATION = 3500;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = generateId();
      const toast: Toast = { id, message, type };

      setToasts((prev) => [...prev.slice(-3), toast]); // max 4 toasts visíveis

      const timer = setTimeout(() => dismiss(id), TOAST_DURATION);
      timersRef.current.set(id, timer);
    },
    [dismiss]
  );

  const success = useCallback((msg: string) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg: string) => addToast(msg, 'error'), [addToast]);
  const info = useCallback((msg: string) => addToast(msg, 'info'), [addToast]);

  return { toasts, success, error, info, dismiss };
}
