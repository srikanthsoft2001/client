import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
  try {
    if (!id) throw new Error('Product ID is required');
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
  const token = localStorage.getItem('authToken');
  const response = await axios.get('http://localhost:3000/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async () => {
  // If you have an API endpoint to invalidate the token/session on server:
  await axios.post(
    `${API_BASE_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );

  // Clear token/localStorage if you store tokens client-side:
  localStorage.removeItem('token'); // or whatever key you use

  // Optionally clear other user-related info in localStorage/sessionStorage
};
// Correct function signature
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // should return { token, user }
};

export const fetchAllProducts = fetchProducts;
export const fetchFlashSales = fetchProducts;
export const fetchBestSelling = fetchProducts;
export const fetchExploreProducts = fetchProducts;
export const getRelatedProducts = fetchProducts;
