
import React, { ReactNode } from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-up" 
        onClick={(e) => e.stopPropagation()}
        dir={document.documentElement.dir}
        >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-light">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
