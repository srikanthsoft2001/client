import React, { useEffect, useReducer, useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff, ChevronUp, ChevronDown } from 'lucide-react';

interface ProductImagesProps {
  images: string[];
  name: string;
}

interface State {
  activeImageIndex: number;
  thumbnailStartIndex: number;
}

type Action =
  | { type: 'SET_ACTIVE_IMAGE'; payload: number }
  | { type: 'SCROLL_THUMBNAILS'; payload: number }
  | { type: 'RESET' }
  | { type: 'ENSURE_VISIBLE'; payload: number };

const THUMBNAILS_TO_SHOW = 4;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_IMAGE':
      return { ...state, activeImageIndex: action.payload };
    case 'SCROLL_THUMBNAILS':
      return { ...state, thumbnailStartIndex: action.payload };
    case 'RESET':
      return { activeImageIndex: 0, thumbnailStartIndex: 0 };
    case 'ENSURE_VISIBLE': {
      const lastVisibleIndex = state.thumbnailStartIndex + THUMBNAILS_TO_SHOW - 1;
      if (action.payload < state.thumbnailStartIndex) {
        return { ...state, thumbnailStartIndex: action.payload };
      } else if (action.payload > lastVisibleIndex) {
        return { ...state, thumbnailStartIndex: action.payload - THUMBNAILS_TO_SHOW + 1 };
      }
      return state;
    }
    default:
      return state;
  }
};

const ProductImages: React.FC<ProductImagesProps> = ({ images = [], name }) => {
  const [state, dispatch] = useReducer(reducer, {
    activeImageIndex: 0,
    thumbnailStartIndex: 0,
  });
  const [erroredImages, setErroredImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setErroredImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index: number) => {
    setErroredImages((prev) => {
      if (prev[index]) {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      }
      return prev;
    });
  };

  const validImages = images.filter((_, i) => !erroredImages[i]);
  const boundedActiveIndex = Math.min(state.activeImageIndex, validImages.length - 1);
  const maxThumbnailStartIndex = Math.max(validImages.length - THUMBNAILS_TO_SHOW, 0);

  // Reset to first image when images change
  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [validImages.length]);

  // Ensure active image is always visible
  useEffect(() => {
    dispatch({ type: 'ENSURE_VISIBLE', payload: boundedActiveIndex });
  }, [boundedActiveIndex]);

  const scrollUp = () => {
    const newIndex = Math.max(state.thumbnailStartIndex - 1, 0);
    dispatch({ type: 'SCROLL_THUMBNAILS', payload: newIndex });
  };

  const scrollDown = () => {
    const newIndex = Math.min(state.thumbnailStartIndex + 1, maxThumbnailStartIndex);
    dispatch({ type: 'SCROLL_THUMBNAILS', payload: newIndex });
  };

  const visibleThumbnails = validImages.slice(
    state.thumbnailStartIndex,
    state.thumbnailStartIndex + THUMBNAILS_TO_SHOW,
  );

  if (!validImages.length) {
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

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {/* Thumbnail sidebar */}
        <div className="flex flex-col items-center space-y-2 w-20 overflow-hidden select-none">
          {state.thumbnailStartIndex > 0 && (
            <button
              onClick={scrollUp}
              className="flex items-center justify-center h-8 w-full text-gray-500 hover:text-gray-700"
              aria-label="Scroll thumbnails up"
              type="button"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          )}

          <div className="flex-1 overflow-y-auto">
            {visibleThumbnails.map((image, idx) => {
              const actualIndex = state.thumbnailStartIndex + idx;
              return (
                <div
                  key={actualIndex}
                  className={cn(
                    'product-thumbnail bg-gray-50 rounded h-20 w-20 mb-2 flex items-center justify-center cursor-pointer border-2',
                    boundedActiveIndex === actualIndex
                      ? 'border-primary'
                      : 'border-transparent hover:border-gray-200',
                  )}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_IMAGE', payload: actualIndex })}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                    onError={() => handleImageError(actualIndex)}
                    onLoad={() => handleImageLoad(actualIndex)}
                  />
                </div>
              );
            })}
          </div>

          {state.thumbnailStartIndex < maxThumbnailStartIndex && (
            <button
              onClick={scrollDown}
              className="flex items-center justify-center h-8 w-full text-gray-500 hover:text-gray-700"
              aria-label="Scroll thumbnails down"
              type="button"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="product-image-container bg-gray-50 rounded-lg overflow-hidden h-96 flex items-center justify-center flex-1">
          {validImages[boundedActiveIndex] ? (
            <img
              src={validImages[boundedActiveIndex]}
              alt={name}
              className="max-h-full max-w-full object-contain"
              onError={() => handleImageError(boundedActiveIndex)}
              onLoad={() => handleImageLoad(boundedActiveIndex)}
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageOff className="h-16 w-16 mb-2" />
              <span>Image not available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
