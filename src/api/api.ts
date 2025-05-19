import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

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

// Generic fetch function for products
const fetchProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await axios.get<ProductItem[]>(API_BASE_URL);

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

// Specific functions can now just call the generic one
export const fetchFlashSales = async (): Promise<ProductItem[]> => {
  return fetchProducts();
};

export const fetchBestSelling = async (): Promise<ProductItem[]> => {
  return fetchProducts();
};

export const fetchExploreProducts = async (): Promise<ProductItem[]> => {
  return fetchProducts();
};

export const getProduct = async (id: string) => {
  try {
    if (!id) throw new Error('Product ID is required');
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// export const getRelatedProducts = async (productId: string) => {
<<<<<<< HEAD
export const getRelatedProducts = async () => {
  const response = await axios.get(`http://localhost:3000/products`);
  return response.data;
};
=======
//   const response = await axios.get(`http://localhost:3000/products`);
//   return response.data;
// };
>>>>>>> b124c97441782773c90c46b68806a315c36ffba6
