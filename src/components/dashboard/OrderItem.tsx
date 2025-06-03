// src/components/OrderItem.tsx
import { Card } from '../ui/card';

type OrderItemProps = {
  productName: string;
  orderId: string;
  date: string;
  customerName: string;
  status: "Delivered" | "Canceled";
  amount: string;
  isSelected: boolean;
  onSelectChange: (isSelected: boolean) => void;
};

export const OrderItem = ({
  productName,
  orderId,
  date,
  customerName,
  status,
  amount,
  isSelected,
  onSelectChange,
}: OrderItemProps) => {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-6 gap-4 items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2">{productName}</span>
        </div>
        <div>{orderId}</div>
        <div>{date}</div>
        <div>{customerName}</div>
        <div>
          <span className={`px-2 py-1 rounded text-xs ${
            status === "Delivered" 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {status}
          </span>
        </div>
        <div className="text-right">{amount}</div>
      </div>
    </Card>
  );
};