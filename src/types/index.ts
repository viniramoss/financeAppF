
export interface Category {
    id: string;
    name: string;
    color: { hex: string };
    icon: { name: string };
}

export interface Method {
    id: string,
    name: string
}

export type TransactionType = {
    id: string;
    amount: number;
    name: string;
    type: "INCOME" | "EXPENSE";
    created_at: string;
    update_at?: string;
    paymentCategory?: {
      id: string;
      name: string;
      colorId: string;
      iconId: string;
    };
    paymentMethod?: {
      id: string;
      name: string;
    };
  };