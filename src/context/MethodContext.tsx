import { createContext, useState, ReactNode } from 'react';
import { Method } from '../types';

export interface MethodContextType {
  selectedMethod: Method | null;
  setMethod: (category: Method) => void;
}

export const MethodContext = createContext<MethodContextType | undefined>(undefined);

export const MethodProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);

  const setMethod = (category: Method) => setSelectedMethod(category);

  return (
    <MethodContext.Provider value={{ selectedMethod, setMethod }}>
      {children}
    </MethodContext.Provider>
  );
};