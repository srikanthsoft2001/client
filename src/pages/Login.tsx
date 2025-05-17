import { loginUser } from '@/api/auth';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    emailOrPhone: string;
    password: string;
  }) => {
    try {
      const credentials = {
        email: formData.emailOrPhone, // assuming your backend expects "email"
        password: formData.password,
      };

      const response = await loginUser(credentials);
      console.log('Login successful:', response);

navigate('/'); // or wherever you want to go after login
} catch (error) {
  console.error('Login failed:', error);
  // Optionally display an error to the user
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
                alt="Login Illustration"
                className="w-full h-auto max-h-[600px] object-cover rounded-md"
              />
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <LoginForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
