import ReusableForm from './ReusableForm';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormData) => void;
  isLoading: boolean;
}

const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const formFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    onSubmit(formData as unknown as SignUpFormData);
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="heading-1 mb-4">Create an account</h1>
      <p className="text-base mb-6">Enter your details below</p>

      <ReusableForm
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Create Account"
        isLoading={isLoading}
      />

      <button
        type="button"
        className="w-full mt-4 py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo"
          className="w-5 h-5"
        />
        Sign up with Google
      </button>

      <div className="mt-6 text-center">
        <p>
          Already have account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
