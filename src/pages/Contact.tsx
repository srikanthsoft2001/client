import ReusableForm from '../components/ReusableForm';

const Contact: React.FC = () => {
  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
      pattern: '[a-z0-9._%+-]+@[a-z-]+\\.[a-z]{2,}$',
      title: 'Enter a valid email (e.g., name@example.com)',
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Your Phone',
      required: true,
      pattern: '\\d{10}',
      title: 'Enter a 10-digit phone number',
    },
    {
      name: 'message',
      type: 'textarea',
      placeholder: 'Your Message',
    },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    console.log('Contact Form Submitted:', formData);
    // Optional: Send to API, show toast, reset, etc.
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
        <div className="space-y-8">
          <div className="p-6 rounded-lg hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Call To Us</h2>
            <p className="text-gray-600 mb-2">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-gray-600">Phone: +880161112222</p>
          </div>

          <div className="p-6 rounded-lg hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Write To Us</h2>
            <p className="text-gray-600 mb-2">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-600 mb-1">Emails: customer@exclusive.com</p>
            <p className="text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div>
          <ReusableForm
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Send Message"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
