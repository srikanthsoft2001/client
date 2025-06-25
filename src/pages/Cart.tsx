// import { useState } from 'react';
// import CartItem from '@/components/cart/CartItem';
// import CartSummary from '@/components/cart/CartSummary';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// const Cart: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([
//     {
//       id: '1',
//       name: 'LCD Monitor',
//       price: 650,
//       quantity: 1,
//       image: '/lovable-uploads/lcd.png',
//     },
//     {
//       id: '2',
//       name: 'Hi Gamepad',
//       price: 550,
//       quantity: 2,
//       image: '/lovable-uploads/gamepad.png',
//     },
//   ]);
//   const [couponCode, setCouponCode] = useState<string>('');

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity >= 1) {
//       setProducts(
//         products.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
//       );
//     }
//   };

//   const removeProduct = (id: string) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

//   const applyCoupon = () => {
//     console.log('Applying coupon:', couponCode);
//   };

//   // const proceedToCheckout = () => {
//   //   console.log('Proceeding to checkout with items:', products);
//   // };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-6xl">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b">
//             <div className="col-span-6 font-semibold">Product</div>
//             <div className="col-span-2 font-semibold text-center">Price</div>
//             <div className="col-span-2 font-semibold text-center">Quantity</div>
//             <div className="col-span-2 font-semibold text-right">Subtotal</div>
//           </div>

//           {products.length > 0 ? (
//             <div className="space-y-6 mt-4">
//               {products.map((p) => (
//                 <CartItem
//                   key={p.id}
//                   {...p}
//                   onUpdateQuantity={updateQuantity}
//                   onRemove={removeProduct}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="py-8 text-center text-muted-foreground">
//               Your cart is empty.
//               <div className="mt-4">
//                 <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2">
//                   Continue Shopping
//                 </Button>
//               </div>
//             </div>
//           )}

//           <div className="mt-8 flex flex-col sm:flex-row gap-4">
//             <Input
//               type="text"
//               placeholder="Coupon Code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//             />
//             <Button
//               className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-4"
//               onClick={applyCoupon}
//             >
//               Apply Coupon
//             </Button>
//           </div>
//         </div>
//         <div className="lg:col-span-1">
//           <CartSummary subtotal={subtotal} />
//           {/* <CartSummary subtotal={subtotal} onCheckout={proceedToCheckout} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { getCart, updateCart } from '@/api/cart'; // You must implement updateCart properly
import { getProduct } from '@/api/api'; // Fetch product details by ID
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface EnrichedCartItem {
  _id: string;
  name: string;
  mainImageUrl: string;
  salePrice: number;
  quantity: number;
  price: number;
  subtotal: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<EnrichedCartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cart = await getCart();
      const items = cart.items || [];

      const enriched = await Promise.all(
        items.map(async (item: any) => {
          const product = await getProduct(item.product);
          if (!product) return null;

          return {
            _id: item.product,
            name: product.name,
            mainImageUrl: product.mainImageUrl,
            salePrice:
              typeof product.salePrice === 'number' ? product.salePrice : 0,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          };
        })
      );

      setCartItems(enriched.filter((item): item is EnrichedCartItem => !!item));
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  };

  const syncCartWithServer = async (items: EnrichedCartItem[]) => {
    const payload = {
      items: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };
    await updateCart(payload);
  };

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    const updatedItems = cartItems
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item
      )
      .filter((item) => item.quantity > 0); // remove items with 0 quantity

    setCartItems(updatedItems);
    await syncCartWithServer(updatedItems);
  };
  const handleRemove = async (id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    await syncCartWithServer(updatedItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b">
            <div className="col-span-6 font-semibold">Product</div>
            <div className="col-span-2 font-semibold text-center">Price</div>
            <div className="col-span-2 font-semibold text-center">Quantity</div>
            <div className="col-span-2 font-semibold text-right">Subtotal</div>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-6 mt-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 items-center gap-4 border-b pb-4"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4">
                    <button
                      className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
                      onClick={() => handleRemove(item._id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                    <img
                      src={item.mainImageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    ₹{item.price.toFixed(2)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-2 py-1 hover:bg-muted"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 min-w-[2rem] text-center">
                        {item.quantity.toString().padStart(2, '0')}
                      </span>
                      <button
                        className="px-2 py-1 hover:bg-muted"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-right font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Your cart is empty.
              <div className="mt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
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
            <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-4">
              Apply Coupon
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-2" />
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
