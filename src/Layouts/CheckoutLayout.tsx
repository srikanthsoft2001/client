import OrderSummary from '../components/OrderSummary';
import BillingForm from '@/components/BillingForm';

const CheckoutLayout = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Billing Form */}
          <div className="md:col-span-2">
            <BillingForm />
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
