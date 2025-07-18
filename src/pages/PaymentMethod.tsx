// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearCart } from '@/store/store';
// import { RootState } from '@/store/store';
// import { toast } from 'react-toastify';
// import { createOrder } from '@/api/cart';

// const PaymentMethod: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const totalAmount = location.state?.total ?? 0;
//   const cartItems = useSelector((state: RootState) => state.cart);
//   const { user, loading } = useSelector((state: RootState) => state.auth);

//   const [selectedMethod, setSelectedMethod] = useState('card');
//   const [selectedBank, setSelectedBank] = useState('');

//   useEffect(() => {
//     if (!loading && !user) {
//       toast.error('⚠️ Please login to proceed with payment.');
//       navigate('/login', { state: { from: location.pathname } });
//     }
//   }, [user, loading, navigate, location.pathname]);

//   const handlePayment = async () => {
//     if (!user) {
//       toast.error('⚠️ Please login to proceed.');
//       return;
//     }

//     if (selectedMethod === 'netbanking' && !selectedBank) {
//       toast.error('Please select a bank for Net Banking.');
//       return;
//     }

//     try {
//       const orderData = {
//         customerId: user._id,
//         items: cartItems.map((item) => ({
//           productId: item._id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           subtotal: item.price * item.quantity,
//         })),
//         totalPrice: totalAmount,
//       };

//       await createOrder(orderData);

//       dispatch(clearCart());
//       toast.success('✅ Order placed successfully!');
//       navigate('/order-success');
//     } catch (err) {
//       console.error('Order error:', err);
//       toast.error('❌ Failed to place order. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="flex justify-between items-center border-b pb-4">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">Order Total</h2>
//               <p className="text-sm text-gray-500">Includes all taxes</p>
//             </div>
//             <div className="text-2xl font-bold text-green-700">₹{totalAmount.toFixed(2)}</div>
//           </div>

//           <div className="space-y-4">
//             {/* Card */}
//             <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="card"
//                 checked={selectedMethod === 'card'}
//                 onChange={() => setSelectedMethod('card')}
//                 className="mt-1"
//               />
//               <div>
//                 <p className="font-medium">Credit/Debit Card</p>
//                 <img src="https://i.imgur.com/Zl0sd2W.png" alt="Card logos" className="h-6 mt-1" />
//               </div>
//             </label>

//             {/* Netbanking */}
//             <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="netbanking"
//                 checked={selectedMethod === 'netbanking'}
//                 onChange={() => setSelectedMethod('netbanking')}
//                 className="mt-1"
//               />
//               <div className="flex-1">
//                 <p className="font-medium">Net Banking</p>
//                 <select
//                   value={selectedBank}
//                   onChange={(e) => setSelectedBank(e.target.value)}
//                   className="border mt-2 px-3 py-1 rounded w-full"
//                   disabled={selectedMethod !== 'netbanking'}
//                 >
//                   <option value="">Select Bank</option>
//                   <option value="SBI">SBI</option>
//                   <option value="HDFC">HDFC</option>
//                   <option value="ICICI">ICICI</option>
//                 </select>
//               </div>
//             </label>

//             {/* UPI */}
//             <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="upi"
//                 checked={selectedMethod === 'upi'}
//                 onChange={() => setSelectedMethod('upi')}
//                 className="mt-1"
//               />
//               <p className="font-medium">UPI Apps (PhonePe, GPay, etc.)</p>
//             </label>

//             {/* COD */}
//             <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={selectedMethod === 'cod'}
//                 onChange={() => setSelectedMethod('cod')}
//                 className="mt-1"
//               />
//               <p className="font-medium">Cash on Delivery (COD)</p>
//             </label>
//           </div>

//           {/* Confirm Button */}
//           <div className="pt-4 border-t">
//             <button
//               onClick={handlePayment}
//               className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded font-semibold w-full"
//             >
//               Confirm Payment Method
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PaymentMethod;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { clearCart } from '@/store';
import { toast } from 'react-toastify';
import { createOrder } from '@/api/cart';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const PaymentMethod: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const totalAmount: number = location.state?.total ?? 0;

  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [selectedBank, setSelectedBank] = useState<string>('');

  useEffect(() => {
    if (!loading && !user) {
      toast.error('⚠️ Please login to proceed with payment.');
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, loading, navigate, location.pathname]);

  const handlePayment = async () => {
    if (!user) {
      toast.error('⚠️ Please login to proceed.');
      return;
    }

    if (selectedMethod === 'netbanking' && !selectedBank) {
      toast.error('Please select a bank for Net Banking.');
      return;
    }

    try {
      const orderData = {
        customerId: user._id,
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        totalPrice: totalAmount,
        paymentMethod: selectedMethod,
      };

      await createOrder(orderData);

      dispatch(clearCart());
      toast.success('✅ Order placed successfully!');
      navigate('/order-success');
    } catch (err) {
      console.error('Order error:', err);
      toast.error('❌ Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Order Total</h2>
              <p className="text-sm text-gray-500">Includes all taxes</p>
            </div>
            <div className="text-2xl font-bold text-green-700">₹{totalAmount.toFixed(2)}</div>
          </div>

          <div className="space-y-4">
            {/* Card */}
            <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={() => setSelectedMethod('card')}
                className="mt-1"
              />
              <div>
                <p className="font-medium">Credit/Debit Card</p>
                <img src="https://i.imgur.com/Zl0sd2W.png" alt="Card logos" className="h-6 mt-1" />
              </div>
            </label>

            {/* Netbanking */}
            <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={selectedMethod === 'netbanking'}
                onChange={() => setSelectedMethod('netbanking')}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-medium">Net Banking</p>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="border mt-2 px-3 py-1 rounded w-full"
                  disabled={selectedMethod !== 'netbanking'}
                >
                  <option value="">Select Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="ICICI">ICICI</option>
                </select>
              </div>
            </label>

            {/* UPI */}
            <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={selectedMethod === 'upi'}
                onChange={() => setSelectedMethod('upi')}
                className="mt-1"
              />
              <p className="font-medium">UPI Apps (PhonePe, GPay, etc.)</p>
            </label>

            {/* COD */}
            <label className="flex items-start gap-3 border p-4 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedMethod === 'cod'}
                onChange={() => setSelectedMethod('cod')}
                className="mt-1"
              />
              <p className="font-medium">Cash on Delivery (COD)</p>
            </label>
          </div>

          {/* Confirm Button */}
          <div className="pt-4 border-t">
            <button
              onClick={handlePayment}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded font-semibold w-full"
            >
              Confirm Payment Method
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentMethod;
