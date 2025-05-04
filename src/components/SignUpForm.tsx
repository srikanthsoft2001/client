import { useState } from "react";

interface SignUpFormData {
  name: string;
  emailOrPhone: string;
  password: string;
}

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormData) => void;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="heading-1 mb-4">Create an account</h1>
      <p className="text-base mb-6">Enter your details below</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Name"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
      required
    />
  </div>
  
  <div>
    <input
      type="text"
      name="emailOrPhone"
      value={formData.emailOrPhone}
      onChange={handleChange}
      placeholder="Email or Phone Number"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
      required
    />
  </div>
  
  <div>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
      required
    />
  </div>
  
  <button
  type="submit"
  className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
>
  Create Account
</button>
  
  <button
    type="button"
    className="w-full py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      alt="Google Logo"
      className="w-5 h-5"
    />
    Sign up with Google
  </button>
</form>
      
      <div className="mt-6 text-center">
        <p>
          Already have account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;