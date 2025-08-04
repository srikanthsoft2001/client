import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FieldConfig = {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
};

interface ReusableFormProps {
  fields: FieldConfig[];
  onSubmit: (formData: Record<string, string>) => void;
  submitLabel?: string;
  className?: string;
  isLoading?: boolean; // Add this line
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields = [],
  onSubmit,
  submitLabel = 'Submit',
  className = '',
  isLoading = false, // Add this line with default value
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'tel' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-6 ${className}`}
    >
      {fields.map((field, index) => {
        const delay = 0.1 + index * 0.1;

        const commonProps = {
          id: field.name,
          name: field.name,
          value: formData[field.name],
          onChange: handleChange,
          required: field.required,
          placeholder: field.placeholder,
          className:
            'w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400',
          disabled: isLoading, // Disable inputs during loading
        };

        return (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
          >
            {field.type === 'textarea' ? (
              <textarea rows={4} {...commonProps} />
            ) : (
              <input
                type={field.type}
                pattern={field.pattern}
                title={field.title}
                {...commonProps}
              />
            )}
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + fields.length * 0.1, duration: 0.4 }}
      >
        <button
          type="submit"
          className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default ReusableForm;
