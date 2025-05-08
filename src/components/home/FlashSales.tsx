import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '../productCard/ProductCard';

const FlashSales = () => {
  // Mock flash sale items data
  const flashSaleItems = [
    {
      id: 1,
      name: 'HAVIT HV-G92 Gamepad',
      originalPrice: '$160',
      salePrice: '$120',
      discountPercentage: '-25%',
      image: 'https://placehold.co/200x200/black/white?text=Gamepad',
      rating: 5,
    },
    {
      id: 2,
      name: 'RGB Keyboard',
      originalPrice: '$160',
      salePrice: '$100',
      discountPercentage: '-35%',
      image: 'https://placehold.co/200x200/black/white?text=Keyboard',
      rating: 4,
    },
    {
      id: 3,
      name: 'LCD Monitor',
      originalPrice: '$400',
      salePrice: '$300',
      discountPercentage: '-25%',
      image: 'https://placehold.co/200x200/black/white?text=Monitor',
      rating: 5,
    },
    {
      id: 4,
      name: 'Chair',
      originalPrice: '$150',
      salePrice: '$100',
      discountPercentage: '-30%',
      image: 'https://placehold.co/200x200/black/white?text=Chair',
      rating: 4,
    },
  ];

  // Time remaining for flash sale (hours, minutes, seconds)
  const timeRemaining = {
    days: '03',
    hours: '23',
    minutes: '19',
    seconds: '56',
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Flash Sales</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="text-sm">Days</div>
              <div className="font-bold">{timeRemaining.days}</div>
            </div>
            <span>:</span>
            <div className="text-center">
              <div className="text-sm">Hours</div>
              <div className="font-bold">{timeRemaining.hours}</div>
            </div>
            <span>:</span>
            <div className="text-center">
              <div className="text-sm">Minutes</div>
              <div className="font-bold">{timeRemaining.minutes}</div>
            </div>
            <span>:</span>
            <div className="text-center">
              <div className="text-sm">Seconds</div>
              <div className="font-bold">{timeRemaining.seconds}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {flashSaleItems.map((item) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {flashSaleItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default FlashSales;
