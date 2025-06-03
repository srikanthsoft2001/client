// src/components/OrderList.tsx
import { Card } from '../ui/card';
import { OrderItem } from './OrderItem';
import { useState } from 'react';
import { Button } from '../ui/button';
import Footer from '../Footer';

type Order = {
  id: number;
  productName: string;
  date: string;
  customerName: string;
  status: "Delivered" | "Canceled";
  amount: string;
};

const orders: Order[] = [
  { id: 25426, productName: "Lorem Ipsum", date: "2023-05-15", customerName: "John Doe", status: "Delivered", amount: "¥200.00" },
  { id: 25425, productName: "Lorem Ipsum", date: "2023-05-14", customerName: "Jane Smith", status: "Canceled", amount: "¥200.00" },
  { id: 25424, productName: "Lorem Ipsum", date: "2023-05-13", customerName: "Bob Johnson", status: "Delivered", amount: "¥200.00" },
  { id: 25423, productName: "Lorem Ipsum", date: "2023-05-12", customerName: "Alice Brown", status: "Canceled", amount: "¥200.00" },
  { id: 25422, productName: "Lorem Ipsum", date: "2023-05-11", customerName: "Charlie Wilson", status: "Delivered", amount: "¥200.00" },
  { id: 25421, productName: "Lorem Ipsum", date: "2023-05-10", customerName: "Diana Miller", status: "Delivered", amount: "¥200.00" },
  { id: 25420, productName: "Lorem Ipsum", date: "2023-05-09", customerName: "Evan Davis", status: "Delivered", amount: "¥200.00" },
];

export const OrderList = () => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleOrderSelect = (orderId: string, isSelected: boolean) => {
    setSelectedOrders(prev => {
      const newSet = new Set(prev);
      isSelected ? newSet.add(orderId) : newSet.delete(orderId);
      return newSet;
    });
    setSelectAll(false);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map(order => order.id.toString())));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-6 gap-4 font-medium text-gray-700">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">Product</span>
          </div>
          <div>Order ID</div>
          <div>Date/Stock</div>
          <div>Customer Name</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </div>
      </Card>
      
      {/* Order Items */}
      <div className="space-y-2">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            productName={order.productName}
            orderId={`#${order.id}`}
            date={order.date}
            customerName={order.customerName}
            status={order.status}
            amount={order.amount}
            isSelected={selectedOrders.has(order.id.toString())}
            onSelectChange={(isSelected) => handleOrderSelect(order.id.toString(), isSelected)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">4</Button>
        <span className="px-4 flex items-center">...</span>
        <Button variant="outline" size="sm">10</Button>
        <Button variant="outline" size="sm">NEXT &gt;</Button>
      </div>

      {/* Footer */}
      
      <Footer/>
    </div>
  );
};