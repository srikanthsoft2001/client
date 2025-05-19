import React from 'react';
import { Truck } from 'lucide-react';

const ShippingInfo: React.FC = () => {
  return (
    <div className="border rounded-lg mt-8 divide-y">
      <div className="p-4 flex items-center">
        <Truck className="h-5 w-5 mr-3" />
        <div>
          <h4 className="font-semibold">Free Delivery</h4>
          <p className="text-sm text-gray-500">
            Enter your postal code for Delivery Availability
          </p>
        </div>
      </div>

      <div className="p-4 flex items-center">
        <svg
          className="h-5 w-5 mr-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <div>
          <h4 className="font-semibold">Return Delivery</h4>
          <p className="text-sm text-gray-500">
            Free 30 Days Delivery Returns. Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
