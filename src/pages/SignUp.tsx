import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/api/auth';
import SignUpForm from '../components/SignUpForm';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: 'seller' | 'buyer';
}

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'seller' | 'buyer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: { name: string; email: string; password: string }) => {
    if (!userType) {
      setError('Please select a user type');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: SignupPayload = {
        ...formData,
        role: userType,
      };

      const response = await signup(payload);
      console.log('Signup successful:', response);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://www.bigcmobiles.com/media/catalog/product/cache/c0cc839bc7fac22c5565a0db476eb91e/v/i/vivo_y300_plus_5g_silk_green_-1.jpg"
                alt="Shopping Illustration"
                className="w-full h-auto max-h-[600px] object-cover rounded-md"
              />
            </div>

            {/* Right side - Sign up form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
                  {error}
                </div>
              )}

              {!userType ? (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4 text-center">
                    Are you signing up as a buyer or seller?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setUserType('buyer')}
                      className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      I'm a Buyer
                    </button>
                    <button
                      onClick={() => setUserType('seller')}
                      className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      I'm a Seller
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex justify-center gap-2">
                    <button
                      onClick={() => setUserType(null)}
                      className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Back
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      Signing up as a {userType}
                    </span>
                  </div>
                  <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
