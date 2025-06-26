import React, { useEffect, useState } from 'react';
import { fetchUserOrders } from '@/api/cart';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt?: string;
}

const OrderListPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?._id) return;

    fetchUserOrders(user._id)
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">🛍️ My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-md mb-4">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="list-disc list-inside ml-2">
              {order.items?.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} (₹{item.price})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderListPage;
