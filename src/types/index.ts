
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

// export interface Transaction {
//     name: string;
//     description: string;
//     type: 'INCOME' | 'EXPENSE';
//     paymentMethod: string;
//     categoryId: string;
//     categoryName: string;
//     categoryColor: string;
//     categoryIcon: string;
// }