import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', 
  withCredentials: true, 
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
};
