// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CheckCircle2 } from 'lucide-react';
// import { createOrder } from '@/api/cart';

// type OrderDto = {
//   customerId: string;
//   productId: string;
//   quantity: number;
//   totalPrice: number;
// };

// const OrderSuccess: React.FC = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const orderDto = state as OrderDto | undefined;

//   const [countdown, setCountdown] = useState(5);
//   const [showCrackers, setShowCrackers] = useState(true);

//   useEffect(() => {
//     // 1) Persist the order
//     if (orderDto) {
//       createOrder(orderDto).then(
//         (saved) => console.log('Order saved:', saved),
//         (err) => console.error('Failed to save order:', err)
//       );
//     } else {
//       console.warn('No order data passed to success page!');
//     }

//     // 2) Hide crackers after 1.5s
//     const crackerTimer = setTimeout(() => setShowCrackers(false), 1500);

//     // 3) Countdown + redirect
//     const countdownTimer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev === 1) {
//           clearInterval(countdownTimer);
//           navigate('/');
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => {
//       clearTimeout(crackerTimer);
//       clearInterval(countdownTimer);
//     };
//   }, [orderDto, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
//       <div className="bg-white/90 backdrop-blur-lg border border-green-300 shadow-xl rounded-3xl p-10 w-full max-w-md text-center animate-fade-in-up">
//         {showCrackers && (
//           <div className="text-5xl mb-3 animate-cracker-blast">🎉🎊🎆</div>
//         )}

//         <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4 animate-scale-pulse" />

//         <h1 className="text-3xl font-bold text-green-700 mb-3">
//           Order Confirmed!
//         </h1>
//         <p className="text-gray-700 text-lg mb-6">
//           You’ll be redirected to{' '}
//           <span className="text-blue-600 font-semibold">Home</span> in{' '}
//           <strong>{countdown}</strong> seconds...
//         </p>

//         <button
//           onClick={() => navigate('/')}
//           className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow"
//         >
//           Go to Home Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;
// src/pages/OrderSuccess.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showCrackers, setShowCrackers] = useState(true);

  useEffect(() => {
    // Hide crackers after 1.5s
    const crackerTimer = setTimeout(() => setShowCrackers(false), 1500);

    // Countdown and navigate
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(crackerTimer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white/90 backdrop-blur-lg border border-green-300 shadow-xl rounded-3xl p-10 w-full max-w-md text-center animate-fade-in-up">
        {showCrackers && (
          <div className="text-5xl mb-3 animate-cracker-blast">🎉🎊🎆</div>
        )}

        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4 animate-scale-pulse" />

        <h1 className="text-3xl font-bold text-green-700 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          You’ll be redirected to{' '}
          <span className="text-blue-600 font-semibold">Home</span> in{' '}
          <strong>{countdown}</strong> seconds...
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
