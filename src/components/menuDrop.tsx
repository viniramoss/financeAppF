import React from 'react';
import { useCard } from '../hooks/useCard';

interface MenuDropProps {
  isOpen: boolean;
}

const MenuDrop: React.FC<MenuDropProps> = ({ isOpen }: {isOpen: boolean}) => {
  const { setActiveCard } = useCard()

  const menuItems = [
    { id: 'recurring', label: 'Recurring Payment' },
    { id: 'reminder', label: 'Reminder' },
    { id: 'charts', label: 'Charts' },
    { id: 'categories', label: 'Categories' },
    { id: 'payment', label: 'Payment Method' },
  ] as const;

  return (
    <div
      className={` absolute top-16 right-[19px] mt-2 w-80 h-72 rounded-3xl bg-neutral-100 shadow-customCardShadow z-40 transform origin-top transition-all duration-300 ease-in-out ${
        isOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-neutral-100 w-4 h-4 rotate-45 absolute right-3 transform -translate-x-1/2 -top-1 z-50">
      </div>
      <ul className="p-4 flex flex-col space-y-4 items-center ">
        {menuItems.map((i) => (
          <li
          key={i.id}
          className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out"
          onClick={() => setActiveCard(i.id)}
          >
            {i.label}
          </li>
        ))}
        {/* <li className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">Recurring Payment</li>
        <li className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">Reminder</li>
        <li className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">Charts</li>
        <li className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">Categories</li>
        <li className="py-1 w-40 text-center border-b-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">Payment Method</li> */}
      </ul>
    </div>
  );
};

export default MenuDrop;
