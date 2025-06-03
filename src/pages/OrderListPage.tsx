// src/pages/OrderListPage.tsx
import { OrderList } from '@/components/dashboard/OrderList';
import { Button } from '../components/ui/button';

export const OrderListPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">ORDER LIST</h1>
      
      <OrderList />
      
      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">4</Button>
        <span className="px-4 flex items-center">...</span>
        <Button variant="outline">10</Button>
        <Button variant="outline">NEXT &gt;</Button>
      </div>
      
      <footer/>
        </div>
  );
};