import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addToCart = async (
  productId: string,
  quantity = 1,
  price: number
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/add`,
      {
        product: productId, // match backend DTO
        quantity,
        price,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`, getAuthHeaders());
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    throw error;
  }
};

export interface CartItemDto {
  product: string; // Product ID
  quantity: number; // Quantity of this product
}

export interface CartResponseDto {
  items: CartItemDto[];
  totalPrice: number;
  totalItems: number;
}

export interface UpdateCartDto {
  items: CartItemDto[];
}

//Update multiple cart items at once
export const updateCart = async (
  updateDto: UpdateCartDto
): Promise<CartResponseDto> => {
  const res = await axios.put('/cart', updateDto);
  return res.data;
};

// Clear the cart
export const clearCart = async (): Promise<CartResponseDto> => {
  const res = await axios.delete('/cart/clear');
  return res.data;
};

// Delete cart completely
export const deleteCart = async (): Promise<void> => {
  await axios.delete('/cart');
};
