import React from "react";
import { cn } from "@/lib/utils";

interface Variant {
  name?: string;
  value: string;
  label?: string;
}

interface ProductVariantsProps {
  type: "color" | "size";
  variants: Variant[];
  selectedVariant: string;
  onSelect: (value: string) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  type,
  variants,
  selectedVariant,
  onSelect
}) => {
  return (
    <div className="pt-4 border-t">
      <h3 className="font-medium mb-3">{type === "color" ? "Colours" : "Size"}:</h3>
      <div className="flex space-x-2">
        {variants.map(variant => (
          <button
            key={variant.value}
            className={cn(
              type === "color" 
                ? "w-8 h-8 rounded-full border-2"
                : "w-10 h-10 rounded border flex items-center justify-center",
              selectedVariant === variant.value 
                ? type === "color"
                  ? "border-primary"
                  : "bg-primary text-primary-foreground"
                : type === "color"
                  ? "border-transparent"
                  : "bg-background hover:bg-muted"
            )}
            style={type === "color" ? { backgroundColor: variant.value } : {}}
            onClick={() => onSelect(variant.value)}
            aria-label={type === "color" ? `Select color ${variant.name}` : `Select size ${variant.label}`}
          >
            {type === "size" && variant.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;