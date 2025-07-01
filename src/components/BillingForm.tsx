import React, { useEffect, useState, useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BillingField {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  title?: string;
}

const baseBillingFields: BillingField[] = [
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    required: true,
  },
  {
    name: 'apartment',
    type: 'text',
    placeholder: 'Apartment, floor, etc. (optional)',
  },
  { name: 'landmark', type: 'text', placeholder: 'Landmark' },
  {
    name: 'streetAddress',
    type: 'text',
    placeholder: 'Street Address',
    required: true,
  },
  { name: 'townCity', type: 'text', placeholder: 'Town/City', required: true },
  {
    name: 'phoneNumber',
    type: 'tel',
    placeholder: 'Phone Number',
    required: true,
  },
  { name: 'pincode', type: 'text', placeholder: 'Pincode' }, // Changed to 'text'
  { name: 'state', type: 'text', placeholder: 'State' },
];

const ReusableForm: React.FC<{
  fields: BillingField[];
  onSubmit: (formData: Record<string, string>) => void;
  defaultValues?: Record<string, string>;
}> = ({ fields, onSubmit, defaultValues = {} }) => {
  const [formData, setFormData] = useState<Record<string, string>>(defaultValues);

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  useEffect(() => {
    onSubmit(formData); // live update
  }, [formData, onSubmit]); // ✅ Added onSubmit to dependency array

  return (
    <form className="space-y-4">
      {fields.map(({ name, type, placeholder, required, pattern, title }) => {
        if (name === 'phoneNumber') {
          return (
            <PhoneInput
              key={name}
              country={'in'}
              value={formData[name] || ''}
              onChange={handlePhoneChange}
              inputProps={{ name, required }}
              inputClass="!w-full !border !rounded-md !px-3 !py-2"
              containerClass="!w-full"
              buttonClass="!border-r-0 !rounded-l-md"
            />
          );
        }

        return (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            pattern={pattern}
            title={title}
            value={formData[name] || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        );
      })}
    </form>
  );
};

const BillingForm: React.FC = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const total = location.state?.total;

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [areaName, setAreaName] = useState('');
  const [locationError, setLocationError] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  const [formValues, setFormValues] = useState<Record<string, string>>({
    firstName: '',
    apartment: '',
    landmark: '',
    streetAddress: '',
    townCity: '',
    phoneNumber: '',
    pincode: '',
    state: '',
  });

  const handleFormSubmit = useCallback((formData: Record<string, string>) => {
    setFormValues(formData);
  }, []);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('❌ Geolocation is not supported by your browser.');
      return;
    }

    setIsFetchingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        toast.success('✅ Location fetched!');

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
          );
          const data = await res.json();

          const fetchedStreet = data.address.road || data.address.pedestrian || '';
          const fetchedCity = data.address.city || data.address.town || data.address.village || '';
          const fetchedArea = data.address.suburb || data.address.neighbourhood || '';
          const fetchedPincode = data.address.postcode || '';
          const fetchedState = data.address.state || '';

          setFormValues((prev) => ({
            ...prev,
            streetAddress: fetchedStreet,
            townCity: fetchedCity,
            pincode: fetchedPincode,
            state: fetchedState,
          }));
          setAreaName(fetchedArea);
          setAutoFilled(true);
          toast.success(`📍 Area: ${fetchedArea}`);
        } catch {
          toast.error('❌ Could not fetch address. Please enter manually.');
        } finally {
          setIsFetchingLocation(false);
        }
      },
      () => {
        setIsFetchingLocation(false);
        setLocationError('❌ Failed to fetch location. Please enter manually.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 📍 Location Section */}
      <div className="border rounded-lg p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-semibold">📍 Delivery Location</h2>
        <button
          onClick={handleFetchLocation}
          disabled={isFetchingLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {isFetchingLocation ? 'Fetching…' : 'Use My Current Location'}
        </button>
        {latitude && longitude && (
          <p className="text-sm text-gray-700">
            GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)} <br />
            Area: {areaName}
          </p>
        )}
        {locationError && <p className="text-red-600">{locationError}</p>}
      </div>

      {/* 💳 Billing Form */}
      <div className="border rounded-lg p-6 bg-white space-y-4">
        <h2 className="text-2xl font-semibold">Shipping Details</h2>
        <ReusableForm
          fields={baseBillingFields.map((f) => ({
            ...f,
            required: autoFilled ? false : f.required,
          }))}
          onSubmit={handleFormSubmit}
          defaultValues={formValues}
        />
        <div className="flex items-center">
          <input type="checkbox" id="saveInfo" className="mr-2" />
          <label htmlFor="saveInfo" className="text-sm">
            Save this information for faster checkout next time
          </label>
        </div>
        {/* Add a continue button here if needed */}
      </div>
    </div>
  );
};

export default BillingForm;
