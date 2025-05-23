// import SignUpForm from '../components/SignUpForm';

// const SignUp = () => {
//   const handleSubmit = (formData: {
//     name: string;
//     emailOrPhone: string;
//     password: string;
//   }) => {
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Left side - Image */}
//             <div className="w-full md:w-1/2">
//               <img
//                 src="https://www.bigcmobiles.com/media/catalog/product/cache/c0cc839bc7fac22c5565a0db476eb91e/v/i/vivo_y300_plus_5g_silk_green_-1.jpg"
//                 alt="Shopping Illustration"
//                 className="w-full h-auto max-h-[600px] object-cover rounded-md"
//               />
//             </div>

//             {/* Right side - Sign up form */}
//             <div className="w-full md:w-1/2 flex flex-col justify-center">
//               <SignUpForm onSubmit={handleSubmit} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SignUp;
import { useNavigate } from 'react-router-dom';
import { signup } from '@/api/auth';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  const navigate = useNavigate(); // ✅ React Router hook

  const handleSubmit = async (formData: {
    name: string;
    emailOrPhone: string;
    password: string;
  }) => {
    try {
      const userData = {
        name: formData.name,
        email: formData.emailOrPhone,
        password: formData.password,
      };

      const response = await signup(userData);
      console.log('Signup successful:', response);

      // ✅ Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally, show an error message to the user here
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
              <SignUpForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
