import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ExploreProducts = () => {
  // Mock products
  const products = [
    {
      id: 1,
      name: "Breed Dry Dog Food",
      price: "$100",
      image: "https://placehold.co/200x200/purple/white?text=DogFood",
      rating: 3,
      reviews: 35,
    },
    {
      id: 2,
      name: "CANON EOS DSLR Camera",
      price: "$360",
      image: "https://placehold.co/200x200/black/white?text=Camera",
      rating: 4,
      reviews: 95,
    },
    {
      id: 3,
      name: "ASUS FHD Gaming Laptop",
      price: "$700",
      image: "https://placehold.co/200x200/gray/white?text=Laptop",
      rating: 5,
      reviews: 325,
    },
    {
      id: 4,
      name: "Curology Product Set",
      price: "$500",
      image: "https://placehold.co/200x200/purple/white?text=Skincare",
      rating: 4,
      reviews: 145,
    },
    {
      id: 5,
      name: "Kids Electric Car",
      price: "$960",
      image: "https://placehold.co/200x200/red/white?text=ToyCar",
      rating: 5,
      reviews: 65,
    },
    {
      id: 6,
      name: "Jr. Zoom Soccer Cleats",
      price: "$1160",
      image: "https://placehold.co/200x200/green/white?text=Cleats",
      rating: 5,
      reviews: 35,
    },
    {
      id: 7,
      name: "GP11 Shooter USB Gamepad",
      price: "$660",
      image: "https://placehold.co/200x200/black/white?text=Gamepad",
      rating: 4,
      reviews: 55,
    },
    {
      id: 8,
      name: "Quilted Satin Jacket",
      price: "$660",
      image: "https://placehold.co/200x200/green/white?text=Jacket",
      rating: 4,
      reviews: 55,
    },
  ];

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Explore Our Products</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border border-gray-200">
            <div className="relative">
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
              </div>
              <div className="p-4">
                <Skeleton className="w-full h-40 rounded-md" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center">
                <span className="font-semibold text-red-500">
                  {product.price}
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
                    fill={index < product.rating ? "gold" : "none"}
                    stroke="gold"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews})
                </span>
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

export default ExploreProducts;
