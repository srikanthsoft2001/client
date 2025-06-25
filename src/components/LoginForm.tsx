import React from 'react';
import ReusableForm from './ReusableForm';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formFields = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$|^[0-9]{10}$',
      title: 'Please enter a valid email or 10-digit phone number',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      minLength: 6,
      title: 'Password must be at least 6 characters',
    },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    const { email, password } = formData;
    onSubmit({ email, password });
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <p className="text-base mb-6">Enter your credentials below</p>

      <ReusableForm
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Log In"
      />

      <button
        type="button"
        className="w-full mt-4 py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo"
          className="w-5 h-5"
        />
        Log in with Google
      </button>

      <div className="mt-6 text-center">
        <p>
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
