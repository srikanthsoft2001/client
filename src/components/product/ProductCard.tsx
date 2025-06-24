import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FiHeart, FiEye, FiStar, FiTrash2 } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { addToWishlist, removeFromWishlist } from '@/api/api';

type Product = {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: string;
  mainImageUrl: string;
  rating: number;
  saleType: string;
};

type ProductCardProps = {
  item: Product;
  isWishlist?: boolean;
  onDelete?: (id: string) => void;
  onWishlistUpdate?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isWishlist = false,
  onDelete,
  onWishlistUpdate,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCardClick = () => {
    navigate(`/products/${item.id}`, { state: { product: item } });
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Add to cart clicked', item.id);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Buy now clicked', item.id);
  };

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
                }}
              >
                <FiEye size={16} />
              </Button>
            </>
          )}
        </div>
        <div className="p-0">
          <img
            src={
              item.mainImageUrl ||
              'https://unblast.com/wp-content/uploads/2023/10/iphone-15-pro-max-mockup.jpg'
            }
            alt={item.name}
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
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
