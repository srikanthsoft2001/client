import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '@/components/product/ProductCard';
import { RootState } from '@/store';
import {
  removeFromWishlist as removeFromLocalWishlist,
  setWishlist,
} from '@/slices/wishlistSlice';
import { getWishlistItems, removeFromWishlist, ProductItem } from '@/api/api';
import { useAuth } from '@/context/AuthContext';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);

        const data = await getWishlistItems(user._id);
        dispatch(setWishlist(data.wishlist));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch wishlist items';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, dispatch]);

  const handleRemoveItem = async (productId: string) => {
    dispatch(removeFromLocalWishlist(productId));

    if (user) {
      try {
        await removeFromWishlist(user._id, productId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove item');
      }
    }
  };

  const formatProductForCard = (product: ProductItem) => ({
    id: product.id.toString(),
    name: product.name,
    originalPrice: product.originalPrice?.toString(),
    salePrice: product.salePrice.toString(),
    discountPercentage: product.discountPercentage
      ? `-${product.discountPercentage}`
      : '',
    mainImageUrl: product.mainImageUrl,
    rating: product.rating || 0,
    saleType: product.saleType,
    category: product.category || '',
  });

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[200px]">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center min-h-[200px] flex items-center justify-center">
        <p>Please login to view your wishlist</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center min-h-[200px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">
            Wishlist ({wishlistItems.length})
          </h2>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              item={formatProductForCard(product)}
              isWishlist={true}
              onDelete={handleRemoveItem}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
