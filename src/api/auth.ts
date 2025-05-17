import axios from 'axios';

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

// Create a centralized Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // hardcoded backend base URL
  withCredentials: true, // include cookies if used for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET /users
export const getUsers = async () => {
  return api.get('/users');
};

// POST /users (Signup)
export const signup = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/users', formData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// POST /auth/login (Login)
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
  return axios.post('http://localhost:3000/auth/login', formData, {
    withCredentials: true, // Needed for cookies
  });
};
