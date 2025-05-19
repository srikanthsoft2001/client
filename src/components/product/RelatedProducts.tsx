import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface RelatedProductsProps {
  currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
}) => {
  // Filter out the current product from related products
  const relatedProducts = [
    {
      id: 2,
      name: 'HAVIT HV-G92 Gamepad',
      price: 120.0,
      originalPrice: 160.0,
      discount: '40%',
      rating: 4,
      reviewCount: 88,
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'AK-900 Wired Keyboard',
      price: 960.0,
      originalPrice: 1160.0,
      discount: '35%',
      rating: 4,
      reviewCount: 75,
      image: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'IPS LCD Gaming Monitor',
      price: 370.0,
      originalPrice: 400.0,
      discount: '30%',
      rating: 5,
      reviewCount: 99,
      image: '/placeholder.svg',
    },
    {
      id: 5,
      name: 'RGB liquid CPU Cooler',
      price: 160.0,
      originalPrice: 170.0,
      discount: '10%',
      rating: 3,
      reviewCount: 65,
      image: '/placeholder.svg',
    },
  ].filter((product) => product.id !== currentProductId);

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Related Items</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                -{product.discount}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md hover:bg-gray-100"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 hover:text-red-500 transition-colors cursor-pointer">
                {product.name}
              </h3>
              <div className="flex items-center mb-2">
                <span className="text-red-500 font-semibold mr-2">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 text-sm line-through">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-500 text-xs ml-1">
                  ({product.reviewCount})
                </span>
              </div>
              <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default RelatedProducts;
