import React, { useState, useEffect } from 'react';
import IconRenderer from './IconRenderer';
import * as Icons from 'lucide-react';

interface Category {
  id: string;
  name: string;
  color: { hex: string };
  icon: { name: string };
}

interface CategoryDropdownProps {
  userId: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ userId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://financeapp-xtt2.onrender.com/category/${userId}`);
        const data = await response.json();
        setCategories(data.category);
      } catch (error) {
        console.error('Erro na busca das categoria:', error);
      }
    };

    fetchCategories();
  }, [userId]);

  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-[280px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between max-h-12 h-12 w-52 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
      >
        <span className="text-gray-700 text-sm">
          {selectedCategory ? selectedCategory.name : 'Select a category'}
        </span>
        <Icons.ChevronDown 
          className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} 
          size={16}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelect(category)}
                className="aspect-square rounded-xl flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  backgroundColor: category.color.hex,
                  color: '#323743',
                }}
              >
                <IconRenderer iconName={category.icon.name} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
