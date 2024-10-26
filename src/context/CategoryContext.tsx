import { createContext, useState, ReactNode } from 'react';
import { Category } from '../types';

export interface CategoryContextType {
  selectedCategory: Category | null;
  setCategory: (category: Category) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const setCategory = (category: Category) => setSelectedCategory(category);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};