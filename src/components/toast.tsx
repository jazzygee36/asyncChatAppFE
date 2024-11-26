'use client';

import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number; // Duration for how long the toast will be visible
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastStyles = {
    success: 'bg-[green]',
    error: 'bg-[#800009]',
    info: 'bg-blue-500',
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 mb-4 text-white rounded-lg shadow-lg ${toastStyles[type]}`}
    >
      <div className='flex items-center'>
        {/* <span className='mr-3'>🟢</span> */}
        <p className='flex-1'>{message}</p>
        <button
          className='ml-3'
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
