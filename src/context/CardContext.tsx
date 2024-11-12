import { createContext, useState, ReactNode } from 'react';
import { CardType } from '../types';

export interface CardContexttype {
    activeCard: CardType;
    setActiveCard: (card: CardType) => void;
}

export const CardContext = createContext<CardContexttype | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
    const [activeCard, setActiveCard] = useState<CardType>('transaction');

    return (
        <CardContext.Provider value={{ activeCard, setActiveCard }}>
          {children}
        </CardContext.Provider>
      );
}