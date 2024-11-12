import React from 'react'
import { useCard } from '../hooks/useCard';
import TransactionForm from "../components/transactionForm";

export const DynamicCard: React.FC = () => {
    const { activeCard } = useCard();

    const handleTransactionAdded = () => {
        console.log('Transação adicionada com sucesso');
    };

    switch (activeCard) {
        case 'transaction':
            return <TransactionForm onTransactionAdded={handleTransactionAdded} />;
        case 'recurring':
            return <RecurringPaymentCard />;
        case 'reminder':
            return <ReminderCard />;
        case 'charts':
            return <ChartsCard />;
        case 'categories':
            return <CategoriesCard />;
        case 'payment':
            return <PaymentMethodCard />;
        default:
            return <TransactionForm onTransactionAdded={handleTransactionAdded} />;
    }
};

const RecurringPaymentCard = () => (
        <h2 className="text-xl font-bold mb-4">RecurringPaymentCard</h2>
);

const ReminderCard = () => (
    <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-4">Reminder</h2>
    </div>
);

const ChartsCard = () => (
    <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-4">Charts</h2>
    </div>
);

const CategoriesCard = () => (
    <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
    </div>
);

const PaymentMethodCard = () => (
    <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
    </div>
);