import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interfaces
export interface ProductItem {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string | number | { $numberDecimal: string };
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
  color: string[];
  size: string[];
}

// Helpers
const normalizeSalePrice = (salePrice: ProductItem['salePrice']): number => {
  if (typeof salePrice === 'object' && '$numberDecimal' in salePrice) {
    return parseFloat(salePrice.$numberDecimal);
  }
  return typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice;
};

const mapProductItem = (item: ProductItem): ProductItem => ({
  ...item,
  salePrice: normalizeSalePrice(item.salePrice),
  // originalPrice: parseFloat(item.originalPrice),
  color: Array.isArray(item.color) ? item.color : [item.color],
  size: Array.isArray(item.size) ? item.size : [item.size],
});

// Fetchers
export const fetchProductsByCategory = async (
  category: string
): Promise<ProductItem[]> => {
  try {
    const response = await api.get<ProductItem[]>(
      `/products/category/${category}`
    );
    return response.data.map(mapProductItem);
  } catch (error) {
    console.error(`Error fetching products by category (${category}):`, error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<ProductItem[]> => {
  if (!query.trim()) return [];
  try {
    const response = await api.get<ProductItem[]>('/products/search', {
      params: { query },
    });
    return response.data.map(mapProductItem);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

const fetchProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await api.get<ProductItem[]>('/products');
    return response.data.map(mapProductItem);
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
    return mapProductItem(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const getRelatedProducts = fetchProducts;
