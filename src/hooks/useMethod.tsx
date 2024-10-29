import { useContext } from 'react';
import { MethodContext, MethodContextType } from '../context/MethodContext';

export const useMethod = (): MethodContextType => {
  const context = useContext(MethodContext);
  if (!context) {
    throw new Error('useMethod must be used within a methodProvider');
  }
  return context;
};
