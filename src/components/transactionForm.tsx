import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { TransactionType } from "../types"
import { useColor } from '../hooks/useColor';

import { EChartsOption } from 'echarts';
import { Loader2, Plus } from "lucide-react";
import IconRenderer from '../components/IconRenderer';
import CategoryDropdown from '../components/categoryDropdown';
import PaymentMethodDropdown from '../components/paymentDropdown';
import { useCategory } from '../hooks/useCategory';
import { useMethod } from '../hooks/useMethod';

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
    const uid = `4377e641-b8cf-4141-8c2d-59e3fa12ed92`;

    const { colors, loading } = useColor();
    const { selectedCategory } = useCategory();
    const { selectedMethod } = useMethod();
    const [transactionType, setTransactionType] = useState<'income' | 'expense' | null>(null);
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [transaction,setTransaction] = useState<TransactionType[]>([])

    const fetchTransactions = async () => {
      fetch (`https://financeapp-xtt2.onrender.com/user/${uid}`)
      .then (response => response.json())
      .then (data => setTransaction(data.user.transaction))
      .catch (error => console.error(error))
    }
    useEffect(() => {
      fetchTransactions()
    }, [])
  
    if (loading) {
      return( 
          <div className='w-screen h-screen bg-white/10 backdrop-blur-lg flex justify-center items-center'>
            <Loader2 className="animate-spin text-gray-500" size={24} />
          </div>
        )
    }

    const expenses = transaction.filter(e => e.type === "EXPENSE");

    const data = expenses.map(t => ({
      value: t.amount,
      name: t.name,
      itemStyle: {
        color: t.paymentCategory? colors[t.paymentCategory.colorId] : '#fff'
      }
    }));
  
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (typeof params === 'object' && 'name' in params && 'value' in params) {
            const total = data.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((params.value as number) / total * 100).toFixed(2);
            return `${params.name}: R$ ${params.value} (${percentage}%)`;
          }
          return '';
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['35%', '65%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data,
        }
      ]
    };


    const handleSubmit = async () => {
        if(!transactionType || !selectedCategory || !selectedMethod || !title || !amount) {
          alert('Preencha todos os campos')
          return
        } 
        const data = {
          name: title,
          amount: parseFloat(amount),
          date: new Date(),
          description,
          type: transactionType.toUpperCase(),
          paymentCategoryName: selectedCategory.name,
          paymentMethodName: selectedMethod.name,
        }

          fetch(`https://financeapp-xtt2.onrender.com/transactions/${uid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
            return response.json();
          })
          .then(data => {
            console.log("Transação criada com sucesso:", data);
            // alert("Transação criada com sucesso!");
            setTitle('');
            setAmount('');
            setDescription('');
            setTransactionType(null);
            onTransactionAdded();
          })
          .catch(error => {
            console.error("Erro ao conectar com o servidor:", error.message);
            // alert("Erro ao conectar com o servidor");
          });
    }


    const handleTitleChange = (t: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(t.target.value)
    }    
    const handleAmountChange = (t: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(t.target.value)
    }  
    const handleDescriptionChange = (d: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(d.target.value)
    }

    const handleSelectedType = (type: 'income' | 'expense') => {
        setTransactionType(type);
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="w-full xl:hidden custom:block custom:h-64 xl:mt-[-2vh]">
                <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
            </div>
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
            <div>
              <input 
                className='w-48 p-2 mt-4 border rounded-xl text-sm'
                placeholder='Value of transaction'
                onChange={handleAmountChange}
              />
            </div>

        </div>
    )
}


export default TransactionForm;