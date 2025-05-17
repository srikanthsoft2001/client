import axios from "axios";

export const signup = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/users', formData, {
      withCredentials: true, // include if your backend sets auth cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // return the created user or auth token, depending on backend
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};


export const login = async (formData: {
  emailOrPhone: string;
  password: string;
}) => {
  return axios.post('http://localhost:3000/auth/login', formData, {
    withCredentials: true, // Needed for cookies
  });
};