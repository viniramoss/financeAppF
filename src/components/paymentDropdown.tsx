import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
}

interface PaymentMethodDropdownProps {
  userId: string;
}

const PaymentMethodDropdown: React.FC<PaymentMethodDropdownProps> = ({ userId }) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://financeapp-xtt2.onrender.com/method/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();



        if (data && data.method) {
          setMethods(data.method);
        }

        else if (data && data.methods) {
          setMethods(data.methods);
        }

        else if (Array.isArray(data)) {
          setMethods(data);
        }
        else {
          throw new Error('Formato de dados inválido');
        }
      } catch (error) {
        console.error('Erro detalhado:', error);
        setError(error instanceof Error ? error.message : 'Erro ao carregar métodos de pagamento');
        setMethods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [userId]);

  const handleSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="w-full max-w-[280px] px-4 py-2.5 bg-white border border-gray-200 rounded-full">
        <span className="text-gray-400 text-sm">Carregando métodos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[280px] px-4 py-2.5 bg-red-50 border border-red-200 rounded-full">
        <span className="text-red-500 text-sm">Erro: {error}</span>
      </div>
    );
  }

  return (
    <div className="relative max-w-[280px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-52 max-h-12 h-12 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
      >
        <span className="text-gray-700 text-sm">
          {selectedMethod ? selectedMethod.name : 'Select a method'}
        </span>
        <Icons.ChevronDown 
          className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} 
          size={16}
        />
      </button>

      {isOpen && methods.length > 0 && (
        <div className="absolute z-10 w-full flex justify-center mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-y-auto">
          <ul className="divide-y divide-gray-100  flex flex-col " >
            {methods.map((method) => (
              <li key={method.id} className='w-40'>
                <button
                  onClick={() => handleSelect(method)}
                  className="w-full text-center px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b border-zinc-200 "
                >
                  {method.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && methods.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-2.5 text-gray-500 text-sm">
            Nenhum método de pagamento encontrado
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodDropdown;