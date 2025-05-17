import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        className="h-10 w-10"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        className="h-10 w-10"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
