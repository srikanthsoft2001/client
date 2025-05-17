import React from 'react';
import ReusableForm from './ReusableForm'; // Update path as necessary

const BillingForm: React.FC = () => {
  const handleFormSubmit = (formData: Record<string, string>) => {
    console.log('Billing form submitted:', formData);
  };

  const billingFields = [
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      placeholder: 'Company Name',
    },
    {
      name: 'streetAddress',
      type: 'text',
      placeholder: 'Street Address',
      required: true,
    },
    {
      name: 'apartment',
      type: 'text',
      placeholder: 'Apartment, floor, etc. (optional)',
    },
    {
      name: 'townCity',
      type: 'text',
      placeholder: 'Town/City',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'tel',
      placeholder: 'Phone Number',
      required: true,
      pattern: '\\d{10}',
      title: 'Enter a valid 10-digit phone number',
    },
    {
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Email Address',
      required: true,
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
      <ReusableForm
        fields={billingFields}
        onSubmit={handleFormSubmit}
        submitLabel="Continue to Payment"
      />
      {/* Optional: Checkbox outside reusable form if needed */}
      <div className="mt-4 flex items-center space-x-2">
        <input type="checkbox" id="saveInfo" />
        <label htmlFor="saveInfo" className="text-sm">
          Save this information for faster check-out next time
        </label>
      </div>
    </div>
  );
};

export default BillingForm;
