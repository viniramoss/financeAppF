/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Inclui todos os arquivos JS e TS
  theme: {
    extend: {
      colors: { 
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
      },
      boxShadow: {
        // x y blur spread color
        // 15 15 150 20 107,114,128,18%
        // -20 -20 120 107,114,128,18%
        'customCardShadow': '15px 15px 60px 10px rgba(107, 114, 128, 0.10), -20px -20px 60px 10px rgba(107, 114, 128, 0.10)',
      
      }
    },
  },
  plugins: [],
};
