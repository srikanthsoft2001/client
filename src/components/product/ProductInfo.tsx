import React from "react";

interface ProductInfoProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  description?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name = "Product Name Not Available",
  price = 0,
  originalPrice,
  rating = 0,
  reviewCount = 0,
  inStock = false,
  description = "No description available"
}) => {
  const renderRatingStars = (ratingValue: number) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    
    return (
      <div className="flex items-center rating-stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400">
            {index < fullStars ? (
              "★"
            ) : index === fullStars && hasHalfStar ? (
              "★"
            ) : (
              "☆"
            )}
          </span>
        ))}
        <span className="ml-2 text-gray-500 text-sm">
          ({reviewCount} Reviews)
        </span>
        {inStock && (
          <span className="ml-4 text-green-500 text-sm">In Stock</span>
        )}
      </div>
    );
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold mb-2">{name}</h1>
        {renderRatingStars(rating)}
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">
          ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
        </span>
        {originalPrice && (
          <span className="text-gray-400 text-sm line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-gray-700">{description}</p>
      </div>
    </>
  );
};

export default ProductInfo;