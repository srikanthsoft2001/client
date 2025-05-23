import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping = 0,
}) => {
  const total = subtotal + shipping;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-6">Cart Total</h2>
      <div className="space-y-4">
        <div className="flex justify-between pb-4 border-b">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal}</span>
        </div>
        <div className="flex justify-between pb-4 border-b">
          <span>Shipping:</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping}`}
          </span>
        </div>
        <div className="flex justify-between pb-4">
          <span>Total:</span>
          <span className="font-semibold">${total}</span>
        </div>
      </div>
      <Button
        onClick={handleCheckout}
        className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2 mt-4"
      >
        Process to checkout
      </Button>
    </div>
  );
};

export default CartSummary;
