import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [], name }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [erroredImages, setErroredImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setErroredImages((prev) => ({ ...prev, [index]: true }));
  };

  if (!images.length || images.every((_, i) => erroredImages[i])) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg overflow-hidden h-96 flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400">
            <ImageOff className="h-16 w-16 mb-2" />
            <span>No images available</span>
          </div>
        </div>
      </div>
    );
  }

  // Filter out errored images
  const validImages = images.filter((_, i) => !erroredImages[i]);
  const activeImage = validImages[Math.min(activeImageIndex, validImages.length - 1)];

  return (
    <div className="space-y-4">
      <div className="product-image-container bg-gray-50 rounded-lg overflow-hidden h-96 flex items-center justify-center">
        {activeImage ? (
          <img
            src={activeImage}
            alt={name}
            className="max-h-full max-w-full object-contain"
            onError={() => handleImageError(activeImageIndex)}
            onLoad={() => {
              setErroredImages((prev) => ({ ...prev, [activeImageIndex]: false }));
            }}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <ImageOff className="h-16 w-16 mb-2" />
            <span>Image not available</span>
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'product-thumbnail bg-gray-50 rounded h-24 flex items-center justify-center cursor-pointer',
                activeImageIndex === index ? 'border-2 border-primary' : ''
              )}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="max-h-full max-w-full object-contain"
                onError={() => handleImageError(index)}
                onLoad={() => {
                  setErroredImages((prev) => ({ ...prev, [index]: false }));
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
