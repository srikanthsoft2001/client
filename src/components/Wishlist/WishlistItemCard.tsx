import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Trash } from 'lucide-react';
import { toast } from 'sonner';

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

interface WishlistItemCardProps {
  item: Product;
  onAddToCart: (id: number) => void;
  onDelete?: (id: number) => void;
}

const WishlistItemCard = ({
  item,
  onAddToCart,
  onDelete,
}: WishlistItemCardProps) => {
  return (
    <Card className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        {item.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            -{item.discount}%
          </div>
        )}
        {item.isNew && !item.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            New
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white rounded-full p-1 hover:bg-gray-100"
            onClick={() => onDelete && onDelete(item.id)}
          >
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
        <div className="p-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-contain rounded-md"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{item.name}</h3>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-red-500">${item.price}</span>
          {item.originalPrice && (
            <span className="text-gray-400 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
        {item.rating && (
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={index < Math.floor(item.rating!) ? 'gold' : 'none'}
                stroke="gold"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">(88)</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-4 w-full">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex-1 flex items-center px-4 py-2"
            onClick={() => onAddToCart(item.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2">
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WishlistItemCard;
