import axios from 'axios';

export const login = async (formData: {
  emailOrPhone: string;
  password: string;
}) => {
  return axios.post('http://localhost:3000/auth/login', formData, {
    withCredentials: true, // Needed for cookies
  });
};
