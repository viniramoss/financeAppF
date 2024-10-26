import { Wallet, Minus, Plus } from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import CategoryDropdown from '../components/categoryDropdown';
import PaymentMethodDropdown from '../components/paymentDropdown';
import { useColor } from '../hooks/useColor';
import { useCategory } from '../hooks/useCategory';
import IconRenderer from '../components/IconRenderer';

export function MainPage() {
  const { colors, loading } = useColor();
  const { selectedCategory } = useCategory();

  if (loading) {
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
    <div className="h-screen max-h-screen overflow-hidden bg-slate-100 ">
      <div className="flex flex-col h-full">
        <div className="bg-neutral-400 h-16 w-full px-8 py-2 flex justify-between items-center">
          <Wallet />
          <span className="flex flex-col">
            <Minus className="relative top-1.5" />
            <Minus className="relative bottom-1.5" />
          </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="absolute top-12">
            <path fill="#a3a3a3" fillOpacity="1" d="M0,24L26.7,32C53.3,40,107,56,160,54C213.3,52,267,32,320,32C373.3,32,427,52,480,50.7C533.3,49,587,24,640,28C693.3,32,747,64,800,84C853.3,104,907,112,960,108C1013.3,104,1067,88,1120,73.3C1173.3,60,1227,48,1280,50.7C1333.3,52,1387,68,1413,76L1440,80L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
          </svg>

        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className=" custom:mt-[-20vh] xl:mt-[-20vh] w-full max-w-4xl h-auto rounded-3xl bg-neutral-100 shadow-customCardShadow xl:p-12 custom:p-16 pt-0 custom:pb-10 relative flex flex-col justify-center items-center">
            <div className="w-full xl:hidden custom:block custom:h-64 xl:mt-[-2vh]">
              <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
            </div>

            <h2 className="text-center mt-0 text-md font-serif">Add your INCOMES/EXPENSES below</h2>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-zinc-200 border-green-500 border-2 px-4 py-2 text-sm rounded-xl">INCOMES</button>
              <button className="bg-zinc-200 border-red-500 border-2 px-4 py-2 text-sm rounded-xl">EXPENSES</button>
            </div>
            <input
              type="text"
              placeholder="Type the name of your income/expense:"
              className="w-4/5 mt-4 p-2 border rounded-xl text-sm "
            />
            <textarea
              name="description"
              placeholder="Add a description here"
              className="w-4/5 mt-2 p-2 border rounded-xl h-20 resize-none text-sm"
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
              <button className="bg-white min-w-28 p-5 pt-1 pb-1 border border-zinc-200 border- rounded-xl flex justify-center items-center">
                <Plus className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
