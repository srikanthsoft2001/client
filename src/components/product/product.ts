export interface Color {
  name: string;
  value: string;
}

export interface Size {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors: Color[];
  sizes: Size[];
  description: string;
  images: string[];
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
}