import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface ProductItem {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string | number | { $numberDecimal: string };
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
  category: string;
}

const normalizeSalePrice = (
  salePrice: ProductItem['salePrice']
): number | string =>
  typeof salePrice === 'object' && '$numberDecimal' in salePrice
    ? parseFloat(salePrice.$numberDecimal)
    : salePrice;

export const searchProducts = async (query: string): Promise<ProductItem[]> => {
  if (!query.trim()) return [];
  try {
    const response = await api.get<ProductItem[]>('/products/search', {
      params: { query },
    });
    return response.data.map((item) => ({
      ...item,
      salePrice: normalizeSalePrice(item.salePrice),
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const fetchProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await api.get<ProductItem[]>('/products');
    return response.data.map((item) => ({
      ...item,
      salePrice: normalizeSalePrice(item.salePrice),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<ProductItem | null> => {
  if (!id) throw new Error('Product ID is required');
  try {
    const response = await api.get<ProductItem>(`/products/${id}`);
    return {
      ...response.data,
      salePrice: normalizeSalePrice(response.data.salePrice),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');
  const response = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('loginName');
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('loginName', user.name);
  return { token, user };
};

// In src/api/auth.ts

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
