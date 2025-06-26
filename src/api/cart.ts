// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     throw new Error('No token found. Please log in again.');
//   }
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// export const addToCart = async (
//   productId: string,
//   quantity = 1,
//   price: number
// ) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/cart/add`,
//       { product: productId, quantity, price },
//       getAuthHeaders()
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed to add to cart:', error);
//     throw error;
//   }
// };

// export const getCart = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/cart`, getAuthHeaders());
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch cart:', error);
//     throw error;
//   }
// };

// export interface CartItemDto {
//   product: string;
//   quantity: number;
// }

// export interface CartResponseDto {
//   items: CartItemDto[];
//   totalPrice: number;
//   totalItems: number;
// }

// export interface UpdateCartDto {
//   items: CartItemDto[];
// }

// export const updateCart = async (
//   updateDto: UpdateCartDto
// ): Promise<CartResponseDto> => {
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/cart`,
//       updateDto,
//       getAuthHeaders()
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed to update cart:', error);
//     throw error;
//   }
// };

// export const clearCart = async (): Promise<CartResponseDto> => {
//   try {
//     const response = await axios.delete(
//       `${BASE_URL}/cart/clear`,
//       getAuthHeaders()
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed to clear cart:', error);
//     throw error;
//   }
// };

// export const deleteCart = async (): Promise<void> => {
//   try {
//     await axios.delete(`${BASE_URL}/cart`, getAuthHeaders());
//   } catch (error) {
//     console.error('Failed to delete cart:', error);
//     throw error;
//   }
// };
// src/api/order.ts
// src/api/orderApi.ts
export async function createOrder(orderData: {
  customerId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  totalPrice: number;
}) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function fetchUserOrders(userId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/orders?customerId=${userId}`
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch orders: ${text}`);
  }
  return res.json();
}
