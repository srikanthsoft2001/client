import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FlashSales = () => {
  // Mock flash sale items data
  const flashSaleItems = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      originalPrice: "$160",
      salePrice: "$120",
      discountPercentage: "-25%",
      image: "https://placehold.co/200x200/black/white?text=Gamepad",
      rating: 5,
    },
    {
      id: 2,
      name: "RGB Keyboard",
      originalPrice: "$160",
      salePrice: "$100",
      discountPercentage: "-35%",
      image: "https://placehold.co/200x200/black/white?text=Keyboard",
      rating: 4,
    },
    {
      id: 3,
      name: "LCD Monitor",
      originalPrice: "$400",
      salePrice: "$300",
      discountPercentage: "-25%",
      image: "https://placehold.co/200x200/black/white?text=Monitor",
      rating: 5,
    },
    {
      id: 4,
      name: "Chair",
      originalPrice: "$150",
      salePrice: "$100",
      discountPercentage: "-30%",
      image: "https://placehold.co/200x200/black/white?text=Chair",
      rating: 4,
    },
  ];

  // Time remaining for flash sale (hours, minutes, seconds)
  const timeRemaining = {
    days: "03",
    hours: "23",
    minutes: "19",
    seconds: "56",
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
          <Card
            key={item.id}
            className="border border-gray-200 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                {item.discountPercentage}
              </div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white rounded-full p-1"
                >
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
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white rounded-full p-1"
                >
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
                    className="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </Button>
              </div>
              <div className="p-4">
                <Skeleton className="w-full h-40 rounded-md" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-red-500">
                  {item.salePrice}
                </span>
                <span className="text-gray-400 line-through">
                  {item.originalPrice}
                </span>
              </div>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={index < item.rating ? "gold" : "none"}
                    stroke="gold"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">(88)</span>
              </div>
            </CardContent>
          </Card>
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
