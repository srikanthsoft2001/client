import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@/store/store';

interface CartItem {
  _id: string;
  name: string;
  mainImageUrl: string;
  price: number;
  quantity: number;
}

interface LocationState {
  productData?: {
    id: string;
    name: string;
    salePrice?: number; // ✅ camelCase
    originalPrice?: number;
    mainImageUrl?: string;
    quantity?: number;
  };
}

const OrderSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedProduct = (location.state as LocationState)?.productData;
  const cartItems = useSelector((state: RootState) => state.cart) as CartItem[];

  const itemsToShow = passedProduct
    ? [
        {
          _id: passedProduct.id,
          name: passedProduct.name,
          mainImageUrl: passedProduct.mainImageUrl || '',
          price: Number(passedProduct.salePrice ?? 0),
          quantity: passedProduct.quantity ?? 1,
        },
      ]
    : cartItems;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponFixedDiscount, setCouponFixedDiscount] = useState(0);
  const [couponPercentageDiscount, setCouponPercentageDiscount] = useState(0);

  const subtotal = itemsToShow.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const percentageDiscountAmount = subtotal * (couponPercentageDiscount / 100);
  const totalDiscount = percentageDiscountAmount + couponFixedDiscount;
  const discountedSubtotal = subtotal - totalDiscount;
  const tax = discountedSubtotal * 0.05;
  const shipping = discountedSubtotal >= 500 ? 0 : 50;
  const total = discountedSubtotal + tax + shipping;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    let fixedDiscount = 0;
    let message = '';

    if (code === 'PATAKHA300' && subtotal >= 900) {
      fixedDiscount = 300;
      message = 'PATAKHA300';
    } else if (code === 'DAMAKA500' && subtotal >= 1200) {
      fixedDiscount = 500;
      message = 'DAMAKA500';
    } else if (code === 'FLAT700' && subtotal >= 1500) {
      fixedDiscount = 700;
      message = 'FLAT700';
    } else {
      alert('❌ Invalid or ineligible coupon.');
      return;
    }

    setAppliedCoupon(message);
    setCouponFixedDiscount(fixedDiscount);
    setCouponPercentageDiscount(0);
    setCouponCode('');
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">🛒 Your Order Summary</h2>

      {itemsToShow.length > 0 ? (
        itemsToShow.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
              <img src={item.mainImageUrl} alt={item.name} className="h-12 w-12 object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div>
              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      <div className="border-t border-b py-4 my-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium">₹{subtotal.toFixed(2)}</p>
        </div>

        {appliedCoupon && (
          <>
            {couponFixedDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon ({appliedCoupon}):</span>
                <span>-₹{couponFixedDiscount.toFixed(2)}</span>
              </div>
            )}
            {couponPercentageDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{couponPercentageDiscount}% Off:</span>
                <span>-₹{percentageDiscountAmount.toFixed(2)}</span>
              </div>
            )}
          </>
        )}

        <div className="flex justify-between">
          <p className="text-gray-600">Tax (5%):</p>
          <p className="font-medium">₹{tax.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</p>
        </div>

        <div className="flex justify-between font-semibold text-lg pt-2">
          <p>Total:</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleApplyCoupon} className="bg-red-500 hover:bg-red-600 text-white">
          Apply Coupon
        </Button>
      </div>

      {appliedCoupon && (
        <div className="text-sm mt-2 text-blue-600">
          ✅ Applied Coupon: <strong>{appliedCoupon}</strong>
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">🎁 Available Coupons</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>
            <strong>PATAKHA300</strong>: ₹300 off on orders ≥ ₹900
          </li>
          <li>
            <strong>DAMAKA500</strong>: ₹500 off on orders ≥ ₹1200
          </li>
          <li>
            <strong>FLAT700</strong>: ₹700 off on orders ≥ ₹1500
          </li>
        </ul>
      </div>

      <div className="pt-6">
        <Button
          onClick={() => navigate('/paymentmethod', { state: { total, items: itemsToShow } })}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg"
          disabled={itemsToShow.length === 0}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
