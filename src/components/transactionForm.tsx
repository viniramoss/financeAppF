import React, { useState } from 'react';
import { Plus } from "lucide-react";
import IconRenderer from '../components/IconRenderer';
import CategoryDropdown from '../components/categoryDropdown';
import PaymentMethodDropdown from '../components/paymentDropdown';
import { useCategory } from '../hooks/useCategory';
import { useMethod } from '../hooks/useMethod';

const TransactionForm: React.FC = () => {
    const uid = `4377e641-b8cf-4141-8c2d-59e3fa12ed92`;

    
    const { selectedCategory } = useCategory();
    const { selectedMethod } = useMethod();
    const [transactionType, setTransactionType] = useState<'income' | 'expense' | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');


    const methodName = selectedMethod?.name;
    const categoryName = selectedCategory?.name;

    const handleSubmit = () => {
        console.log({
        categoryName,
        methodName,
        transactionType,
        title,
        description
        })
    }


    const handleTitleChange = (t: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(t.target.value)
    }  
    const handleDescriptionChange = (d: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(d.target.value)
    }

    const handleSelectedType = (type: 'income' | 'expense') => {
        setTransactionType(type);
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className="text-center mt-0 text-md font-serif">Add your INCOMES/EXPENSES below</h2>
            <div className="flex justify-center gap-4 mt-2">
              <button 
                className={`bg-zinc-200 ${transactionType === "income" ? `border-green-500` : `border-none`} border-2 px-4 py-2 text-sm rounded-xl`}
                onClick={() => handleSelectedType("income")}
              >INCOMES
              </button>
              <button 
                className={`bg-zinc-200 ${transactionType === "expense" ? `border-red-500` : `border-none`} border-2 px-4 py-2 text-sm rounded-xl`}
                onClick={() => handleSelectedType("expense")}
                >EXPENSES
              </button>
            </div>
            <input
              type="text"
              placeholder="Type the name of your income/expense:"
              className="w-4/5 mt-4 p-2 border rounded-xl text-sm "
              onChange={handleTitleChange}
            />
            <textarea
              name="description"
              placeholder="Add a description here"
              className="w-4/5 mt-2 p-2 border rounded-xl h-20 resize-none text-sm"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <div className="flex justify-around space-x-8 mt-4">
              <button className="bg-white min-w-28 p-5 pt-1 pb-1 border border-zinc-200 border- rounded-xl">Sumary</button>
              <PaymentMethodDropdown userId={uid} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: selectedCategory ? selectedCategory.color.hex : 'rgb(228, 228, 231)'
              }}>
                
                {selectedCategory && (
                  <IconRenderer iconName={selectedCategory.icon.name} />
                )}
            </div>
              <CategoryDropdown userId={uid} />
              <button 
              className="bg-white min-w-28 p-5 pt-1 pb-1 border border-zinc-200 border- rounded-xl flex justify-center items-center"
              onClick={() => handleSubmit()}
              >
                <Plus className="text-gray-500" />
              </button>
            </div>

        </div>
    )
}


export default TransactionForm;