import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { useColor } from '../hooks/useColor';
import CardLayout from "../components/cardlayout";
import TransactionForm from "../components/transactionForm";
import { useEffect, useState } from "react";
import MenuDrop from '../components/menuDrop';
import { TransactionType } from "../types"
const uid = '4377e641-b8cf-4141-8c2d-59e3fa12ed92'


export function MainPage() {
  const { colors, loading } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const [transaction,setTransaction] = useState<TransactionType[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      fetch (`https://financeapp-xtt2.onrender.com/user/${uid}`)
      .then (response => response.json())
      .then (data => setTransaction(data.user.transaction))
      .catch (error => console.error(error))
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Colors:", colors);
  console.log("Transaction:", transaction);
  console.log("Category ID:", transaction.map(t => t.paymentCategory?.colorId));
  

  const data = transaction.map(t => ({
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

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-slate-100 ">
      <div className="flex flex-col h-full">
        <div className="bg-neutral-400 h-16 w-full px-8 py-2 flex justify-between items-center">
          <img src="src/assets/icon.svg" />
          <span className="flex flex-col cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <span className="flex flex-col ">
            <span
              className={`block w-8 h-0.5 bg-current transition-transform duration-500 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0 translate-y-0'
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-current mt-3 transition-transform duration-500 ease-in-out ${
                isOpen ? '-rotate-[405deg] -translate-y-1' : 'rotate-0 translate-y-0'
              }`}
            ></span>
          </span>
          <MenuDrop isOpen={isOpen} />
        </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="absolute top-12">
          <path fill="#a3a3a3" fillOpacity="1" d="M0,24L26.7,32C53.3,40,107,56,160,54C213.3,52,267,32,320,32C373.3,32,427,52,480,50.7C533.3,49,587,24,640,28C693.3,32,747,64,800,84C853.3,104,907,112,960,108C1013.3,104,1067,88,1120,73.3C1173.3,60,1227,48,1280,50.7C1333.3,52,1387,68,1413,76L1440,80L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
        </svg>

        <div className="flex-grow flex flex-col items-center justify-center p-4">

          <CardLayout> 
            <div className="w-full xl:hidden custom:block custom:h-64 xl:mt-[-2vh]">
                <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
            </div>
            <TransactionForm />
          </CardLayout>

        </div>
      </div>
    </div>
  );
}
