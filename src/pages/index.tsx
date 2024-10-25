import { Wallet, Minus } from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import CategoryDropdown from '../components/categoryDropdown';
import PaymentMethodDropdown from '../components/paymentDropdown';
import { useColor } from '../hooks/useColor';

export function MainPage() {
  const { colors, loading } = useColor();
  console.log(colors);
  if (loading) {
    console.log(colors);
    return <div>Loading...</div>;
  }

  const data = [
    { value: 1048, name: 'Manutenção', itemStyle: { color: colors['3ed1d80b-c0e4-44dd-a1c8-97f222a6a1c6'] } },
    { value: 1048.80, name: 'Mercado', itemStyle: { color: colors['9f183114-6889-46b2-ad44-67552a69f60d'] } },
    { value: 580, name: 'Transporte', itemStyle: { color: colors['7f9c7e0e-d762-460f-a1a4-df026a7f517e'] } },
    { value: 484, name: 'Animais', itemStyle: { color: colors['30b2bd12-e95c-4388-80ae-ff4ac3b9d0ba'] } },
    { value: 300, name: 'Roupas', itemStyle: { color: colors['b5cb198f-3bca-4643-8205-13ea0298f236'] } }
  ];

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

  const uid = `4377e641-b8cf-4141-8c2d-59e3fa12ed92`;

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-slate-100">
      <div className="flex flex-col h-full">
        <div className="bg-neutral-400 h-16 w-full px-8 py-2 flex justify-between items-center">
          <Wallet />
          <span className="flex flex-col">
            <Minus className="relative top-1.5" />
            <Minus className="relative bottom-1.5" />
          </span>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="custom:mt-[-20vh] xl:mt-0 w-full max-w-lg h-auto rounded-3xl bg-neutral-100 shadow-customCardShadow xl:p-6 xl:pt-0 custom:p-16 pt-0 custom:pb-10 relative flex flex-col justify-center items-center">
            <div className="w-full xl:h-52 custom:h-64 xl:mt-[-2vh]">
              <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
            </div>

            <h2 className="text-center mt-0 text-md font-serif">Add your INCOMES/EXPENSES below</h2>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-xl">INCOMES</button>
              <button className="bg-red-500 text-white px-4 py-2 text-sm rounded-xl">EXPENSES</button>
            </div>
            <input
              type="text"
              placeholder="Type the name of your income/expense:"
              className="w-4/5 mt-4 p-2 border rounded-xl"
            />
            <textarea
              name="description"
              placeholder="Add a description here"
              className="w-4/5 mt-2 p-2 border rounded-xl resize-none"
            ></textarea>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-evenly mt-4">
              <PaymentMethodDropdown userId={uid} />
              <CategoryDropdown userId={uid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
