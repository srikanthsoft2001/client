import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import WishlistItemCard from '@/components/Wishlist/WishlistItemCard';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  isNew?: boolean;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: 1,
      name: 'Gucci duffle bag',
      image: '/images/gucci-bag.jpg', // replace with actual image paths
      price: 960,
      originalPrice: 1160,
      discount: 35,
    },
    {
      id: 2,
      name: 'RGB liquid CPU Cooler',
      image: '/images/rgb-cooler.jpg',
      price: 1960,
    },
    {
      id: 3,
      name: 'GP11 Shooter USB Gamepad',
      image: '/images/gp11-gamepad.jpg',
      price: 550,
    },
    {
      id: 4,
      name: 'Quilted Satin Jacket',
      image: '/images/satin-jacket.jpg',
      price: 750,
    },
    {
      id: 5,
      name: 'ASUS FHD Gaming Laptop',
      image: '/images/asus-laptop.jpg',
      price: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 5,
    },
    {
      id: 6,
      name: 'IPS LCD Gaming Monitor',
      image: '/images/ips-monitor.jpg',
      price: 1160,
      rating: 5,
    },
    {
      id: 7,
      name: 'HAVIT HV-G92 Gamepad',
      image: '/images/havit-gamepad.jpg',
      price: 560,
      isNew: true,
      rating: 5,
    },
    {
      id: 8,
      name: 'AK-900 Wired Keyboard',
      image: '/images/ak-900-keyboard.jpg',
      price: 200,
      rating: 5,
    },
  ]);

  const handleAddToCart = (id: number) => {
    toast.success('Added to cart successfully!');
  };

  const handleMoveAllToBag = () => {
    wishlistItems.forEach((item) => handleAddToCart(item.id));
    toast.success('All items moved to bag!');
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <WishlistItemCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.slice(4, 8).map((item) => (
          <WishlistItemCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;
