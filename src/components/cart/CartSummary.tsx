// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';

// interface CartSummaryProps {
//   subtotal: number;
//   shipping?: number;
// }

// const CartSummary: React.FC<CartSummaryProps> = ({
//   subtotal,
//   shipping = 0,
// }) => {
//   const total = subtotal + shipping;
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate('/checkout');
//   };

//   return (
//     <div className="border rounded-md p-6">
//       <h2 className="text-xl font-semibold mb-6">Cart Total</h2>
//       <div className="space-y-4">
//         <div className="flex justify-between pb-4 border-b">
//           <span>Subtotal:</span>
//           <span className="font-medium">${subtotal}</span>
//         </div>
//         <div className="flex justify-between pb-4 border-b">
//           <span>Shipping:</span>
//           <span className="font-medium">
//             {shipping === 0 ? 'Free' : `$${shipping}`}
//           </span>
//         </div>
//         <div className="flex justify-between pb-4">
//           <span>Total:</span>
//           <span className="font-semibold">${total}</span>
//         </div>
//       </div>
//       <Button
//         onClick={handleCheckout}
//         className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2 mt-4"
//       >
//         Process to checkout
//       </Button>
//     </div>
//   );
// };

// export default CartSummary;
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, onCheckout }) => {
  const shipping = subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping;

  return (
    <div className="border rounded-xl p-6 shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2 text-sm">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm">
        <span>Shipping</span>
        <span>₹{shipping}</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-base">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <Button
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
