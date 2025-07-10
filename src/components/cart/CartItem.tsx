import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  mainImageUrl: string;
  onUpdateQuantity: (_id: string, quantity: number) => void;
  onRemove: (_id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  _id,
  name,
  price,
  quantity,
  mainImageUrl,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 border-b">
      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
        <button
          className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
          onClick={() => onRemove(_id)}
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
          <img src={mainImageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className="font-medium">{name}</span>
      </div>

      <div className="col-span-4 md:col-span-2 text-center">${price.toFixed(2)}</div>

      <div className="col-span-4 md:col-span-2 flex justify-center">
        <div className="flex items-center border rounded-md">
          <button
            className="px-2 py-1 hover:bg-muted"
            onClick={() => {
              if (quantity <= 1) {
                onRemove(_id);
              } else {
                onUpdateQuantity(_id, quantity - 1);
              }
            }}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 min-w-[2rem] text-center">
            {quantity.toString().padStart(2, '0')}
          </span>
          <button
            className="px-2 py-1 hover:bg-muted"
            onClick={() => onUpdateQuantity(_id, quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 text-right">${(price * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
