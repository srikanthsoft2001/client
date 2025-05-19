import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const OrderSummary = () => {
  const [paymentMethod] = useState<string>('bank');
  const [couponCode, setCouponCode] = useState<string>('');

  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'LCD Monitor',
      price: 650,
      image: '/lovable-uploads/0fabc3f7-d978-4c3a-a430-6680fe1ed88e.png',
    },
    {
      id: 2,
      name: 'H1 Gamepad',
      price: 1100,
      image: '/lovable-uploads/0fabc3f7-d978-4c3a-a430-6680fe1ed88e.png',
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleApplyCoupon = () => {
    if (couponCode) {
      console.log(`Applying coupon: ${couponCode}`);
    }
  };

  const handlePlaceOrder = () => {
    console.log('Order placed with payment method:', paymentMethod);
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm">
      {orderItems.map((item) => (
        <div key={item.id} className="flex items-center mb-4 gap-3">
          <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm">{item.name}</p>
          </div>
          <div>
            <p className="font-medium">${item.price}</p>
          </div>
        </div>
      ))}

      <div className="border-t border-b py-4 my-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium">${subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping}`}
          </p>
        </div>
      </div>

      <div className="flex justify-between my-4">
        <p className="font-medium">Total:</p>
        <p className="font-bold">${total}</p>
      </div>

      {/* Payment method logic is commented out for now */}

      <div className="flex gap-2 mt-6 mb-6">
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleApplyCoupon}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Apply Coupon
        </Button>
      </div>

      <Button
        onClick={handlePlaceOrder}
        className="w-full bg-red-500 hover:bg-red-700 text-white"
      >
        Place Order
      </Button>
    </div>
  );
};

export default OrderSummary;
