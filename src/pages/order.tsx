import OrderSummary from '@/components/OrderSummary';

const OrderPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
      <OrderSummary />
    </div>
  );
};

export default OrderPage;
