import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FiHeart, FiEye, FiStar, FiTrash2 } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addToWishlist, removeFromWishlist } from '@/api/api';
import { addToCart, useAppDispatch } from '@/store/store';
import { useAuth } from '@/context/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Product = {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
  category?: string;
};

interface ProductCardProps {
  item: Product;
  isWishlist?: boolean;
  onDelete?: (id: string) => void;
  onWishlistUpdate?: () => void;
}

const getImageUrl = (url?: string) => {
  return url && url.trim() !== ''
    ? url
    : 'https://unblast.com/wp-content/uploads/2023/10/iphone-15-pro-max-mockup.jpg';
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isWishlist = false,
  onDelete,
  onWishlistUpdate,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInReduxWishlist = wishlistItems.some((p) => p.id.toString() === item.id.toString());

  const [isWishlisted, setIsWishlisted] = useState(isInReduxWishlist);

  useEffect(() => {
    // Sync local state if wishlist updates externally
    setIsWishlisted(isInReduxWishlist);
  }, [isInReduxWishlist]);

  const handleCardClick = () => {
    navigate(`/products/${item.id}`);
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return;

    try {
      const nextState = !isWishlisted;
      setIsWishlisted(nextState); // Instant visual feedback

      if (nextState) {
        await addToWishlist(user._id, item.id);
      } else {
        await removeFromWishlist(user._id, item.id);
        onDelete?.(item.id); // for wishlist page
      }

      onWishlistUpdate?.(); // trigger refresh if needed
    } catch (error) {
      console.error('Wishlist update failed:', error);
      // Revert state on error
      setIsWishlisted(isWishlisted);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Optionally check user before adding to cart
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }

    const cartItem = {
      _id: item.id,
      name: item.name,
      mainImageUrl: item.mainImageUrl,
      price: Number(item.salePrice),
      quantity: 1,
      subtotal: Number(item.salePrice),
    };

    dispatch(addToCart(cartItem));
    navigate('/cart');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    navigate('/checkout', {
      state: {
        productData: {
          id: item.id,
          name: item.name,
          salePrice: Number(item.salePrice),
          originalPrice: Number(item.originalPrice),
          discount: item.discountPercentage,
          mainImageUrl: item.mainImageUrl,
          rating: item.rating,
        },
        quantity: 1,
        selectedColor: null,
        selectedSize: null,
      },
    });
  };

  // Round rating for star display
  const roundedRating = Math.round(item.rating);

  return (
    <Card
      onClick={handleCardClick}
      className="border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        {item.discountPercentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            {item.discountPercentage}
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
          {isWishlist ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white rounded-full p-1 text-red-500"
              aria-label="Remove from wishlist"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete?.(item.id);
              }}
            >
              <FiTrash2 size={16} />
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white rounded-full p-1"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={handleWishlistClick}
              >
                <FiHeart
                  size={16}
                  className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white rounded-full p-1 text-gray-500"
                aria-label="View product"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <FiEye size={16} />
              </Button>
            </>
          )}
        </div>
        <img
          src={getImageUrl(item.mainImageUrl)}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{item.name}</h3>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-red-500">${item.salePrice}</span>
          <span className="text-gray-400 line-through">${item.originalPrice}</span>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <FiStar
              key={index}
              size={16}
              className={index < roundedRating ? 'text-yellow-400' : 'text-gray-300'}
              fill={index < roundedRating ? 'currentColor' : 'none'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {item.rating ? `(${item.rating.toFixed(1)})` : '(No ratings)'}
          </span>
        </div>
        <div className="flex space-x-4 mt-6">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex-1 flex items-center px-4 py-2"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
