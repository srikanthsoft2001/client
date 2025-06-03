import axios from 'axios';

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

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

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic fetch function for products
const fetchProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await api.get<ProductItem[]>('/products');

    return response.data.map((item) => ({
      ...item,
      salePrice:
        typeof item.salePrice === 'object' && '$numberDecimal' in item.salePrice
          ? parseFloat(item.salePrice.$numberDecimal)
          : item.salePrice,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchAllProducts = async (): Promise<ProductItem[]> => {
  return fetchProducts();
};

export const getProduct = async (id: string) => {
  try {
    if (!id) throw new Error('Product ID is required');
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getRelatedProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};
