import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  rating?: number;
  isNew?: boolean;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: '1',
      name: 'Gucci duffle bag',
      image: '/images/gucci-bag.jpg',
      price: '960',
      originalPrice: '1160',
      discount: 35,
    },
    {
      id: '2',
      name: 'RGB liquid CPU Cooler',
      image: '/images/rgb-cooler.jpg',
      price: '1960',
    },
    {
      id: '3',
      name: 'GP11 Shooter USB Gamepad',
      image: '/images/gp11-gamepad.jpg',
      price: '550',
    },
    {
      id: '4',
      name: 'Quilted Satin Jacket',
      image: '/images/satin-jacket.jpg',
      price: '750',
    },
    {
      id: '5',
      name: 'ASUS FHD Gaming Laptop',
      image: '/images/asus-laptop.jpg',
      price: '960',
      originalPrice: '1160',
      discount: 35,
      rating: 5,
    },
    {
      id: '6',
      name: 'IPS LCD Gaming Monitor',
      image: '/images/ips-monitor.jpg',
      price: '1160',
      rating: 5,
    },
    {
      id: '7',
      name: 'HAVIT HV-G92 Gamepad',
      image: '/images/havit-gamepad.jpg',
      price: '560',
      isNew: true,
      rating: 5,
    },
    {
      id: '8',
      name: 'AK-900 Wired Keyboard',
      image: '/images/ak-900-keyboard.jpg',
      price: '200',
      rating: 5,
    },
  ]);

  const handleAddToCart = (id: string) => {
    toast.success('Added to cart successfully!', { id });
  };

  const handleMoveAllToBag = () => {
    wishlistItems.forEach((item) => handleAddToCart(item.id));
    toast.success('All items moved to bag!');
  };

  const handleDeleteItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
    toast.success('Item removed from wishlist');
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      {/* Wishlist Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">
            Wishlist ({wishlistItems.length})
          </h2>
        </div>
        <Button
          variant="outline"
          className="bg-red-500 hover:bg-red-600 text-white px-8"
          onClick={handleMoveAllToBag}
        >
          Move All To Bag
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard
            key={product.id}
            item={{
              id: product.id,
              name: product.name,
              salePrice: product.price,
              originalPrice: product.originalPrice ?? '',
              discountPercentage: product.discount?.toString() ?? '0',
              mainImageUrl: product.image,
              rating: product.rating ?? 0,
              saleType: 'regular', // or another appropriate default/type
            }}
            isWishlist={true}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      {/* Just For You Header */}
      <div className="mt-16 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-8 bg-red-500 mr-2"></div>
            <h2 className="text-xl font-bold">Just For You</h2>
          </div>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white px-8"
          >
            See All
          </Button>
        </div>
      </div>

      {/* Just For You Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.slice(4, 8).map((item) => (
          <ProductCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              salePrice: item.price,
              originalPrice: item.originalPrice ?? '',
              discountPercentage: item.discount?.toString() ?? '0',
              mainImageUrl: item.image,
              rating: item.rating ?? 0,
              saleType: 'regular', // or another appropriate default/type
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;
