import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ============ Interfaces ============

export interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// Inside auth.ts
export interface UpdateUserPayload {
  name: string;
  email: string;
  address: string;
  currentPassword?: string;
  newPassword?: string;
}

// ============ API Methods ============

// Login
export const loginUser = async ({ email, password }: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('loginName');
};

// Signup
export const signup = async (formData: SignupData): Promise<User> => {
  const response = await api.post<User>('/users', formData);
  return response.data;
};

// Get user by ID
export const getUserById = async (_id: string): Promise<User> => {
  const response = await api.get<User>(`${API_BASE_URL}/users/${_id}`);
  return response.data;
};

// Update user by ID
export const updateUserById = async (_id: string, payload: UpdateUserPayload): Promise<User> => {
  const response = await api.put<User>(`${API_BASE_URL}/users/${_id}`, payload);
  return response.data;
};

// Error extractor utility (optional)
export const extractAxiosErrorMessage = (error: unknown): string => {
  if (
    axios.isAxiosError(error) &&
    error.response &&
    typeof error.response.data?.message === 'string'
  ) {
    return error.response.data.message;
  }
  return 'Something went wrong. Please try again.';
};
