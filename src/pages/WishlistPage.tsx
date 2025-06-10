import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductCard from '@/components/product/ProductCard';
import { getWishlistItems, ProductItem } from '@/api/api';


const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlistItems();
        setWishlistItems(data);
      } catch (error) {
        toast.error('Failed to fetch wishlist items.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const formatProductForCard = (product: ProductItem) => ({
    id: product.id.toString(),
    name: product.name,
    originalPrice: product.originalPrice?.toString(),
    salePrice: product.salePrice.toString(),
    discountPercentage: product.discountPercentage ? `-${product.discountPercentage}%` : '',
    mainImageUrl: product.mainImageUrl,
    rating: product.rating || 0,
    saleType: product.saleType,
    category: '',
  });

  if (loading) return <div className="p-6">Loading wishlist...</div>;

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
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard
            key={product.id}
            item={formatProductForCard(product)}
            isWishlist={true}
            onDelete={() => {}} // Optional placeholder
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;
