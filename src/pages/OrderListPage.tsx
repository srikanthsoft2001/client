// src/pages/OrderListPage.tsx
import { OrderList } from '@/components/dashboard/OrderList';

export const OrderListPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">ORDER LIST</h1>
      <OrderList />
    </div>
  );
};
