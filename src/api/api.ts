// src/api/api.ts
import axios from 'axios';

// Use VITE_ prefix for environment variable in Vite
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

const fetchProducts = async (): Promise<ProductItem[]> => {
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

export const fetchFlashSales = fetchProducts;
export const fetchBestSelling = fetchProducts;
export const fetchExploreProducts = fetchProducts;

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

export const getRelatedProducts = fetchProducts;
