import { useContext } from 'react';
import { CategoryContext, CategoryContextType } from '../context/CategoryContext';

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
