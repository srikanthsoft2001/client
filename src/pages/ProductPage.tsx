import { getProduct } from '@/api';
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

export interface ProductVariant {
  id: number;
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

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductVariant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is missing');
        }

        const product = await getProduct(id);
        if (!product) {
          throw new Error('Product not found');
        }

        // Ensure images array exists and has at least one image
        const validatedProduct = {
          ...product,
          images: product.images?.length
            ? product.images
            : ['/placeholder-product.png'],
        };

        setProductData(validatedProduct);
        if (validatedProduct.colors?.length) {
          setSelectedColor(validatedProduct.colors[0].value);
        }
        if (validatedProduct.sizes?.length) {
          setSelectedSize(
            validatedProduct.sizes[
              Math.floor(validatedProduct.sizes.length / 2)
            ].value
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

  if (error || !productData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          We couldn't find the product you're looking for. It may have been
          removed or is temporarily unavailable.
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
      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ProductImages images={productData.images} name={productData.name} />

        <div className="space-y-6">
          <ProductInfo
            name={productData?.name}
            price={productData?.price}
            originalPrice={productData?.originalPrice}
            rating={productData?.rating}
            reviewCount={productData?.reviewCount}
            inStock={productData?.inStock}
            description={productData?.description}
          />

          {productData.colors?.length > 0 && (
            <ProductVariants
              type="color"
              variants={productData.colors}
              selectedVariant={selectedColor}
              onSelect={setSelectedColor}
            />
          )}

          {productData.sizes?.length > 0 && (
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

            <Button className="bg-sale-red hover:bg-red-700 text-white flex-1">
              Buy Now
            </Button>

            <Button variant="outline" size="icon" className="shrink-0">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <ShippingInfo />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={productData.id} />
    </main>
  );
};

export default ProductPage;
