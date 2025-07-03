// src/pages/ProductPage.tsx
import { getProduct } from '@/api/api';
import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import ProductVariants from '@/components/product/ProductVariants';
import QuantitySelector from '@/components/product/QuantitySelector';
import RelatedProducts from '@/components/product/RelatedProducts';
import ShippingInfo from '@/components/product/ShippingInfo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Color {
  name: string;
  value: string;
}

interface Size {
  label: string;
  value: string;
}

export interface ProductData {
  id: number;
  name: string;
  saleprice: number;
  originalPrice?: number;
  discount?: number;
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

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('Product ID is missing');

        const product = await getProduct(id);
        if (!product) throw new Error('Product not found');

        const validatedProduct: ProductData = {
          ...product,
          id: Number(product.id),
          saleprice: product.salePrice ? Number(product.salePrice) : 0,
          originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
          rating: Number(product.rating) || 0,
          reviewCount: Number(product.reviewsCount ?? 0),
          images: [
            ...(product.mainImageUrl ? [product.mainImageUrl] : []),
            ...(Array.isArray(product.images) ? product.images : []),
          ],
          colors: Array.isArray(product.colors) ? product.colors : [],
          sizes: Array.isArray(product.sizes) ? product.sizes : [],
          description: product.description || '',
          inStock: Boolean(product.inStock),
        };

        setProductData(validatedProduct);

        if (validatedProduct.colors?.length) {
          setSelectedColor(validatedProduct.colors[0].value);
        }
        if (validatedProduct.sizes?.length) {
          setSelectedSize(
            validatedProduct.sizes[Math.floor(validatedProduct.sizes.length / 2)].value,
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToWishlist = () => {
    console.log('Added to wishlist');
  };

  const handleBuyNow = () => {
    console.log('Buy now clicked');
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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
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
            salePrice={productData.saleprice}
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
              onIncrement={() => setQuantity(quantity + 1)}
              onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
            />

            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-5 w-5" />
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
