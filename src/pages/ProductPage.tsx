import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaShoppingCart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import {
  getProduct,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
  getWishlistItems,
} from '@/api/api';

import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import ProductVariants from '@/components/product/ProductVariants';
import QuantitySelector from '@/components/product/QuantitySelector';
import ShippingInfo from '@/components/product/ShippingInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { useAuth } from '@/context/useAuth';
import { useAppDispatch, addToCart } from '@/store';

interface Color {
  name: string;
  value: string;
}
interface Size {
  label: string;
  value: string;
}
export interface ProductData {
  _id: string;
  id: number;
  name: string;
  salePrice: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors: Color[];
  sizes: Size[];
  description: string;
  images: string[];
  mainImageUrl?: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Helper to extract images from product object dynamically
  const extractImages = (product: {
    mainImageUrl?: string;
    subimageUrls?: string[];
    images?: string[];
  }): string[] => {
    const images: string[] = [];
    if (product.mainImageUrl) images.push(product.mainImageUrl);
    if (Array.isArray(product.subimageUrls)) images.push(...product.subimageUrls);
    if (Array.isArray(product.images)) images.push(...product.images);
    return images;
  };

  useEffect(() => {
    const fetchProductAndWishlist = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('Product ID is missing');
        const product = await getProduct(id);
        if (!product) throw new Error('Product not found');

        const validated: ProductData = {
          ...product,
          _id: product.id,
          id: Number(product.id),
          salePrice: Number(product.salePrice) || 0,
          originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
          rating: Number(product.rating) || 0,
          reviewCount: Number(product.reviewsCount || 0),
          images: extractImages(product),
          colors: Array.isArray(product.colors)
            ? product.colors.map((color: string) => ({ name: color, value: color }))
            : [],
          sizes: Array.isArray(product.sizes)
            ? product.sizes.map((size: string) => ({ label: size, value: size }))
            : [],
          description: product.description || '',
          inStock: Boolean(product.inStock),
          mainImageUrl: product.mainImageUrl,
        };
        setProductData(validated);

        if (validated.colors.length) setSelectedColor(validated.colors[0].value);
        if (validated.sizes.length) {
          const mid = Math.floor(validated.sizes.length / 2);
          setSelectedSize(validated.sizes[mid].value);
        }

        if (user) {
          const wishlistRes = await getWishlistItems(user._id);
          const found = wishlistRes.wishlist.some((item) => item.id.toString() === id);
          setIsWishlisted(found);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductAndWishlist();
  }, [id, user]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productData) return;
    const variantKey = `${productData.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    const cartItem = {
      _id: String(productData._id),
      variantId: variantKey,
      name: productData.name,
      mainImageUrl: productData.mainImageUrl || productData.images[0] || '',
      price: productData.salePrice,
      quantity,
      subtotal: productData.salePrice * quantity,
      selectedColor,
      selectedSize,
    };
    dispatch(addToCart(cartItem));
    navigate('/cart');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productData) return;
    navigate('/checkout', {
      state: {
        productData: {
          ...productData,
          quantity,
          selectedColor,
          selectedSize,
        },
      },
    });
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!productData?._id) return;

    try {
      const next = !isWishlisted;
      setIsWishlisted(next);
      if (next) {
        await apiAddToWishlist(user._id, productData._id);
      } else {
        await apiRemoveFromWishlist(user._id, productData._id);
      }
    } catch (err) {
      console.error('Wishlist update failed:', err);
      setIsWishlisted(!isWishlisted);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading product...</div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          We couldn't find the product you're looking for.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ProductImages
          images={productData.images}
          name={productData.name}
          key={`images-${productData.id}`}
        />
        <div className="space-y-6">
          <ProductInfo
            name={productData.name}
            salePrice={productData.salePrice}
            originalPrice={productData.originalPrice}
            rating={productData.rating}
            reviewCount={productData.reviewCount}
            inStock={productData.inStock}
            description={productData.description}
          />
          {productData.colors.length > 0 && (
            <ProductVariants
              type="color"
              variants={productData.colors}
              selectedVariant={selectedColor}
              onSelect={setSelectedColor}
            />
          )}
          {productData.sizes.length > 0 && (
            <ProductVariants
              type="size"
              variants={productData.sizes}
              selectedVariant={selectedSize}
              onSelect={setSelectedSize}
            />
          )}
          <div className="pt-4 border-t flex items-center space-x-4">
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex-1 flex items-center px-4 py-2"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white rounded-full p-1 border border-gray-300"
              onClick={handleWishlistClick}
            >
              <FiHeart
                size={16}
                className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
          <ShippingInfo />
        </div>
      </div>
      <RelatedProducts currentProductId={productData.id} />
    </main>
  );
};

export default ProductPage;
