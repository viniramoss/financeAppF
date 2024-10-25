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
      
      },
      screens: {
        'xs': '480px',      // Para telas muito pequenas
        'sm': '640px',      // Modifica o comportamento do 'sm'
        'md': '768px',      // Modifica o comportamento do 'md'
        'lg': '1024px',     // Modifica o 'lg'
        'xl': '1280px',     // Para telas maiores
        '2xl': '1536px',    // Define novo breakpoint
        'custom': '1900px', // Adiciona um breakpoint específico
      },
    },
  },
  plugins: [],
};
