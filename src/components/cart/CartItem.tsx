// import React from 'react';
// import { Minus, Plus, Trash2 } from 'lucide-react';

// interface CartItemProps {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   onUpdateQuantity: (id: string, quantity: number) => void;
//   onRemove: (id: string) => void;
// }

// const CartItem: React.FC<CartItemProps> = ({
//   id,
//   name,
//   price,
//   quantity,
//   image,
//   onUpdateQuantity,
//   onRemove,
// }) => {
//   return (
//     <div className="grid grid-cols-12 gap-4 items-center py-4 border-b">
//       <div className="col-span-12 md:col-span-6 flex items-center gap-4">
//         <button
//           className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
//           onClick={() => onRemove(id)}
//           aria-label="Remove item"
//         >
//           <Trash2 size={18} />
//         </button>
//         <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
//           <img src={image} alt={name} className="w-full h-full object-cover" />
//         </div>
//         <span className="font-medium">{name}</span>
//       </div>
//       <div className="col-span-4 md:col-span-2 text-center md:text-center">
//         ${price}
//       </div>
//       <div className="col-span-4 md:col-span-2 flex justify-center">
//         <div className="flex items-center border rounded-md">
//           <button
//             className="px-2 py-1 hover:bg-muted"
//             onClick={() => onUpdateQuantity(id, quantity - 1)}
//             disabled={quantity <= 1}
//           >
//             <Minus size={16} />
//           </button>
//           <span className="px-3 py-1 min-w-[2rem] text-center">
//             {quantity.toString().padStart(2, '0')}
//           </span>
//           <button
//             className="px-2 py-1 hover:bg-muted"
//             onClick={() => onUpdateQuantity(id, quantity + 1)}
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       </div>
//       <div className="col-span-4 md:col-span-2 text-right">
//         ${price * quantity}
//       </div>
//     </div>
//   );
// };

// export default CartItem;
import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: {
    _id: string;
    name: string;
    mainImageUrl: string;
    salePrice: number;
    quantity: number;
    price: number;
    subtotal: number;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 border-b">
      {/* Image, name, remove */}
      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
        <button
          className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
          onClick={() => onRemove(item._id)}
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
          <img
            src={item.mainImageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium">{item.name}</span>
      </div>

      {/* Price */}
      <div className="col-span-4 md:col-span-2 text-center md:text-center">
        ₹{item.price.toFixed(2)}
      </div>

      {/* Quantity control */}
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <div className="flex items-center border rounded-md">
          <button
            className="px-2 py-1 hover:bg-muted"
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 min-w-[2rem] text-center">
            {item.quantity.toString().padStart(2, '0')}
          </span>
          <button
            className="px-2 py-1 hover:bg-muted"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="col-span-4 md:col-span-2 text-right font-semibold">
        ₹{item.subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
