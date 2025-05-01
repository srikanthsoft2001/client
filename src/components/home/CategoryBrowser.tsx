import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";

const CategoryBrowser = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 1, name: "Phones", icon: <Smartphone size={24} /> },
    { id: 2, name: "Computers", icon: <Monitor size={24} /> },
    { id: 3, name: "SmartWatch", icon: <Watch size={24} /> },
    { id: 4, name: "Camera", icon: <Camera size={24} /> },
    { id: 5, name: "Headphones", icon: <Headphones size={24} /> },
    { id: 6, name: "Gaming", icon: <Gamepad2 size={24} /> },
  ];

  const nextSlide = () => {
    if (currentSlide < categories.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(categories.length - 1);
    }
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Browse By Category</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 hover:border-red-500 hover:text-red-500 transition-colors"
          >
            {category.icon}
            <span className="mt-2">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="sm:hidden relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / 3)}%)`,
            width: `${categories.length * (100 / 3)}%`,
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-1/3 px-2" // Shows 3 items at a time on mobile
            >
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-32 w-full hover:border-red-500 hover:text-red-500 transition-colors"
              >
                {category.icon}
                <span className="mt-2">{category.name}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBrowser;
