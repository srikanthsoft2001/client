import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FiHeart, FiEye, FiStar, FiTrash2 } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { addToWishlist, removeFromWishlist } from '@/api/api';
import { addToCart, useAppDispatch } from '@/store/store';

type Product = {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
  onDelete?: (id: string) => void;
};

interface ProductCardProps {
  item: Product;
  userId?: string;
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
  // userId,
  isWishlist = false,
  onDelete,
  onWishlistUpdate,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    navigate(`/products/${item.id}`);
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    //Add commentMore actions
    e.stopPropagation();
    e.preventDefault();

    if (!user) return;

    try {
      if (isWishlist) {
        await removeFromWishlist(user._id, item.id);
        onDelete?.(item.id); // 🔄 Notify parent to update state
      } else {
        await addToWishlist(user._id, item.id);
      }

      onWishlistUpdate?.();
    } catch (error) {
      console.error('Wishlist update failed:', error);
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      _id: item.id,
      name: item.name,
      mainImageUrl: item.mainImageUrl,
      price: Number(item.salePrice),
      quantity: 1,
      subtotal: Number(item.salePrice),
    };

    // Add to Redux and localStorage
    dispatch(addToCart(cartItem));
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Buy now clicked', item.id);
  };

  // const handleWishlistClick = async (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (!user) return;

  //   try {
  //     if (isWishlist) {
  //       await removeFromWishlist(user._id, item.id);
  //       onDelete?.(item.id);
  //     } else {
  //       await addToWishlist(user._id, item.id);
  //     }

  //     onWishlistUpdate?.();
  //   } catch (error) {
  //     console.error('Wishlist update failed:', error);
  //   }
  // };

  // const handleBuyNow = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   console.log('Buy now clicked', item.id);
  //   // Could navigate to checkout page, e.g.:
  //   // navigate('/checkout', { state: { item } });
  // };

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
              className="h-8 w-8 bg-white rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete?.(item.id); // 💥 Triggers removal in WishlistPage
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
                onClick={handleWishlistClick}
              >
                <FiHeart size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log('Preview clicked');
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
          <span className="text-gray-400 line-through">
            ${item.originalPrice}
          </span>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <FiStar
              key={index}
              size={16}
              className={
                index < item.rating ? 'text-yellow-400' : 'text-gray-300'
              }
              fill={index < item.rating ? 'currentColor' : 'none'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {item.rating ? `(${item.rating})` : '(No ratings)'}
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
