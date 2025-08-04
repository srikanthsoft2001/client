// api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------- Types ----------
type SalePriceDecimal = { $numberDecimal: string };

export interface ProductItem {
  reviewsCount: number;
  inStock: boolean;
  description: string;
  sizes: string[];
  colors: string[];
  images: string[]; // URLs
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string | number | SalePriceDecimal;
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
  category: string;
}

export interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface User {
  id: string;
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

// ---------- Helpers ----------
const normalizeSalePrice = (salePrice: ProductItem['salePrice']): number | string =>
  typeof salePrice === 'object' && '$numberDecimal' in salePrice
    ? parseFloat(salePrice.$numberDecimal)
    : salePrice;

// ---------- Product APIs ----------
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

export const createProduct = async (productData: FormData): Promise<ProductItem> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.post<ProductItem>(`${API_BASE_URL}/products/add`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// ---------- Auth APIs ----------
export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
  localStorage.removeItem('token');
};

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

// ---------- Wishlist APIs ----------
export const getWishlistItems = async (userId: string): Promise<{ wishlist: ProductItem[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/wishlist`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch wishlist');
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to fetch wishlist');
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to fetch wishlist. Please try again later.');
  }
};

export const addToWishlist = async (
  userId: string,
  productId: string,
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add to wishlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (
  userId: string,
  productId: string,
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/wishlist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove from wishlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const sendChatMessage = async (message: string): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/chatbot/message`, { message });
  return response.data.reply;
};

// ---------- Aliases ----------
export const fetchAllProducts = fetchProducts;
export const fetchFlashSales = fetchProducts;
export const fetchBestSelling = fetchProducts;
export const fetchExploreProducts = fetchProducts;
export const getRelatedProducts = fetchProducts;
