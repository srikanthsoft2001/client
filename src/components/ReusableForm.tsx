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
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields = [],
  onSubmit,
  submitLabel = 'Submit',
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'tel' ? value.replace(/\D/g, '').slice(0, 10) : value;
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
          className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 hover:shadow-md active:scale-95"
        >
          {submitLabel}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default ReusableForm;
