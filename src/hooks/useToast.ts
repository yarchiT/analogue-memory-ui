import { useState } from 'react';
import { ToastType } from '../components/Toast';

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Show a toast notification
  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  };

  // Hide the toast notification
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  // Convenience methods for different toast types
  const showSuccessToast = (message: string) => showToast(message, 'success');
  const showErrorToast = (message: string) => showToast(message, 'error');
  const showInfoToast = (message: string) => showToast(message, 'info');
  const showWarningToast = (message: string) => showToast(message, 'warning');

  return {
    toast,
    showToast,
    hideToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast
  };
};

export default useToast; 