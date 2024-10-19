import React from 'react';
import { Wallet, Minus } from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { EChartsOption, TooltipComponentOption } from 'echarts';

const tailwindColors = {
  amareloPastel: '#FFD699',
  rosaPastel: '#FF99CC',
  azulPastel: '#99CCFF',
  verdePastel: '#99FFCC',
  laranjaPastel: '#FFA852',
  verdeLimaPastel: '#CCFF99',
  salmaoPastel: '#FF99AA',
  pessegoPastel: '#FFAA99',
  verdeAguaPastel: '#99FFAA',
  lilasPastel: '#AA99FF',
  vermelhoPastel: '#CC99CC',
};

export function MainPage() {
  const data = [
    { value: 1048, name: 'Manutenção', itemStyle: { color: tailwindColors.amareloPastel } },
    { value: 1048, name: 'Mercado', itemStyle: { color: tailwindColors.laranjaPastel } },
    { value: 580, name: 'Transporte', itemStyle: { color: tailwindColors.rosaPastel } },
    { value: 484, name: 'Animais', itemStyle: { color: tailwindColors.pessegoPastel } },
    { value: 300, name: 'Roupas', itemStyle: { color: tailwindColors.verdePastel } }
  ];

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (typeof params === 'object' && 'name' in params && 'value' in params) {
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const percentage = ((params.value as number) / total * 100).toFixed(2);
          return `${params.name}: ${params.value} (${percentage}%)`;
        }
        return '';
      }
    } as TooltipComponentOption,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data,
      }
    ]
  };

  return (
    <div className="h-screen bg-slate-100">
      <div className="flex flex-col h-full">
        <div className="bg-neutral-400 h-16 w-screen px-8 py-2 flex justify-between items-center">
          <Wallet />
          <span className="flex flex-col">
            <Minus className="relative top-1.5" />
            <Minus className="relative bottom-1.5" />
          </span>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-[60vw] md:w-[37vw] h-[70vh] rounded-3xl bg-neutral-100 shadow-customCardShadow">
            <ReactECharts option={option} />
          </div>
        </div>
      </div>
    </div>
  );
}