import React, { useEffect, useState } from 'react';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setShow(false), 300); // Wait for animation
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 pointer-events-auto" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl transform transition-transform duration-300 pointer-events-auto max-h-[85vh] overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-10'}`}
      >
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-2xl">
           <h3 className="font-serif text-lg font-bold text-hokkaido-dark">{title || 'Details'}</h3>
           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
             <XIcon className="w-6 h-6 text-gray-500" />
           </button>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};