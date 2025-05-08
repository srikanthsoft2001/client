import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'LCD Monitor',
      price: 650,
      quantity: 1,
      image: '/lovable-uploads/lcd.png',
    },
    {
      id: '2',
      name: 'Hi Gamepad',
      price: 550,
      quantity: 2,
      image: '/lovable-uploads/gamepad.png',
    },
  ]);
  const [couponCode, setCouponCode] = useState<string>('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setProducts(
        products.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
    }
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const applyCoupon = () => {
    console.log('Applying coupon:', couponCode);
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', products);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-12xl">
      <div>
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b">
              <div className="col-span-6 font-semibold">Product</div>
              <div className="col-span-2 font-semibold text-center">Price</div>
              <div className="col-span-2 font-semibold text-center">
                Quantity
              </div>
              <div className="col-span-2 font-semibold text-right">
                Subtotal
              </div>
            </div>

            {products.length > 0 ? (
              <div className="space-y-6 mt-4">
                {products.map((p) => (
                  <CartItem
                    key={p.id}
                    {...p}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Your cart is empty.
                <div className="mt-4">
                  <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-4"
                onClick={applyCoupon}
              >
                Apply Coupon
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} onCheckout={proceedToCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
