// import { useNavigate } from 'react-router-dom';
// import LoginForm from '../components/LoginForm';
// import { loginUser } from '@/api/auth';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (formData: {
//     email: string;
//     password: string;
//   }) => {
//     try {
//       const response = await loginUser(formData);
//       console.log('response' + JSON.stringify(response));
//       if (response.token) localStorage.setItem('token', response.token);
//       if (response.user?.name)
//         localStorage.setItem('loginName', response.user.name);

//       alert(`Login successful! Welcome, ${response.user?.name || 'User'}`);
//       navigate('/account');
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed. Please check your credentials and try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="w-full md:w-1/2">
//               <img
//                 src="https://www.bigcmobiles.com/media/catalog/product/cache/c0cc839bc7fac22c5565a0db476eb91e/v/i/vivo_y300_plus_5g_silk_green_-1.jpg"
//                 alt="Login Illustration"
//                 className="w-full h-auto max-h-[600px] object-cover rounded-md"
//               />
//             </div>
//             <div className="w-full md:w-1/2 flex flex-col justify-center">
//               <LoginForm onSubmit={handleSubmit} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext'; // ✅ Import context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login from context

  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      console.log(formData);
      const response = await loginUser(formData);
      console.log('response' + JSON.stringify(response));

      // ✅ Save to context + localStorage
      if (response.token && response.user) {
        login(response.token, response.user); // sets context + localStorage
        alert(`Login successful! Welcome, ${response.user.name}`);
        navigate('/account');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <img
                src="https://www.bigcmobiles.com/media/catalog/product/cache/c0cc839bc7fac22c5565a0db476eb91e/v/i/vivo_y300_plus_5g_silk_green_-1.jpg"
                alt="Login Illustration"
                className="w-full h-auto max-h-[600px] object-cover rounded-md"
              />
            </div>
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
