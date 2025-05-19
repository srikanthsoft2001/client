import React from 'react';
import { cn } from '@/lib/utils';

interface Variant {
  name?: string; 
  value: string; 
  label?: string; 
}

interface ProductVariantsProps {
  type: 'color' | 'size';
  variants: Variant[];
  selectedVariant: string;
  onSelect: (value: string) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  type,
  variants,
  selectedVariant,
  onSelect,
}) => {
  return (
    <div className="pt-4 border-t">
      <h3 className="font-medium mb-3">
<<<<<<< HEAD
        {type === 'color' ? 'Colours' : 'Size'}:
      </h3>
      <div className="flex space-x-2">
        {variants.map((variant) => (
          <button
            key={variant.value}
            className={cn(
              type === 'color'
                ? 'w-8 h-8 rounded-full border-2'
                : 'w-10 h-10 rounded border flex items-center justify-center',
              selectedVariant === variant.value
                ? type === 'color'
                  ? 'border-primary'
                  : 'bg-primary text-primary-foreground'
                : type === 'color'
                ? 'border-transparent'
                : 'bg-background hover:bg-muted'
            )}
            style={type === 'color' ? { backgroundColor: variant.value } : {}}
            onClick={() => onSelect(variant.value)}
            aria-label={
              type === 'color'
                ? `Select color ${variant.name}`
                : `Select size ${variant.label}`
            }
          >
            {type === 'size' && variant.label}
          </button>
        ))}
=======
        {type === "color" ? "Colours" : "Size"}:
      </h3>
      <div className="flex space-x-2 flex-wrap">
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant.value;

          return (
            <button
              key={variant.value}
              onClick={() => onSelect(variant.value)}
              className={cn(
                "transition-all",
                type === "color"
                  ? "w-8 h-8 rounded-full border-2"
                  : "px-3 h-10 rounded-md border text-sm font-medium",
                isSelected
                  ? type === "color"
                    ? "border-black ring-2 ring-offset-1"
                    : "bg-black text-white border-black"
                  : type === "color"
                    ? "border-gray-300"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
              )}
              style={type === "color" ? { backgroundColor: variant.value } : {}}
              aria-label={
                type === "color"
                  ? `Select color ${variant.name || variant.value}`
                  : `Select size ${variant.label}`
              }
            >
              {type === "size" && variant.label}
            </button>
          );
        })}
>>>>>>> b124c97441782773c90c46b68806a315c36ffba6
      </div>

      {/* Display selected color name if type is color */}
      {type === "color" && selectedVariant && (
        <p className="text-sm text-gray-600 mt-2">
          Selected Color:{" "}
          {
            variants.find((v) => v.value === selectedVariant)?.name ??
            selectedVariant
          }
        </p>
      )}
    </div>
  );
};

export default ProductVariants;
