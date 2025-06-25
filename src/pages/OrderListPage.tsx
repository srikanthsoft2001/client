// src/pages/OrderListPage.tsx
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Store/store';
import { Card } from '@/components/ui/card';
import { fetchUserOrders } from '@/api/cart';

// Types
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export const OrderListPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await fetchUserOrders(user._id);
        setOrders(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  if (!user)
    return <div className="p-6">Please login to view your orders.</div>;
  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">ORDER LIST</h1>
      {orders.length === 0 && <div>No orders found.</div>}
      {orders.map((order) => (
        <Card key={order._id} className="p-4 space-y-2">
          <div className="text-sm text-gray-700 font-medium">
            Order ID: {order._id}
          </div>
          <div className="text-sm">Total: ₹{order.totalAmount}</div>
          <div className="text-sm">Payment: {order.paymentMethod}</div>
          <div className="text-sm">Status: {order.status}</div>
          <div className="text-sm text-muted-foreground">
            Ordered On: {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity} × ₹{item.price}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};
