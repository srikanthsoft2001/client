import React from 'react';

interface ProductInfoProps {
  name?: string;
  salePrice?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  description?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name = 'Product Name Not Available',
  salePrice = 0,
  originalPrice,
  rating = 0,
  // reviewCount = 0,
  inStock = false,
  description = 'No description available',
}) => {
  const formatPrice = (price: number | undefined) => {
    if (!price) return '0.00';
    // Convert price to dollars if it's in cents (19999 -> 199.99)
    const priceInDollars = price > 1000 ? price / 100 : price;
    return priceInDollars.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const renderRatingStars = (ratingValue: number) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    return (
      <div className="flex items-center rating-stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400">
            {index < fullStars
              ? '★'
              : index === fullStars && hasHalfStar
              ? '★'
              : '☆'}
          </span>
        ))}
        <span className="ml-2 text-gray-800 font-medium text-sm">
          {ratingValue.toFixed(1)}
        </span>
        {/* <span className="ml-2 text-gray-500 text-sm">
          ({reviewCount} Reviews)
        </span> */}
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
        <span className="text-2xl font-bold">${formatPrice(salePrice)}</span>
        {originalPrice && originalPrice > 0 && (
          <span className="text-gray-400 text-sm line-through">
            ${formatPrice(originalPrice)}
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
