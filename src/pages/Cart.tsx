import { useSelector, useDispatch } from 'react-redux';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { removeFromCart, RootState, updateQuantity } from '@/Store/store';

const Cart: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (_id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ _id, quantity: newQuantity }));
    }
  };
  const handleRemoveProduct = (_id: string) => {
    dispatch(removeFromCart(_id));
  };

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

          {products.length > 0 ? (
            <div className="space-y-6 mt-4">
              {products.map((item) => (
                <CartItem
                  key={item._id}
                  {...item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveProduct}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Your cart is empty.
              <div className="mt-4">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2"
                  onClick={() => (window.location.href = '/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
