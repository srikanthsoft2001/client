import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const navigate = useNavigate();

  const shipping = subtotal >= 100 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-summary border p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">🧾 Cart Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%):</span>
          <span>+₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">
                <s className="text-gray-400">₹50.00</s> Free
              </span>
            ) : (
              <>₹{shipping.toFixed(2)}</>
            )}
          </span>
        </div>

        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2 mt-6 w-full"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
