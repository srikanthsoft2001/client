import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

const BestSelling = () => {
  // Mock best selling products
  const products = [
    {
      id: 1,
      name: "The North Coat",
      price: "$260",
      oldPrice: "$360",
      image: "https://placehold.co/200x200/red/white?text=Coat",
      rating: 5,
      reviews: 65,
    },
    {
      id: 2,
      name: "Gucci Duffle Bag",
      price: "$960",
      oldPrice: "$1160",
      image: "https://placehold.co/200x200/brown/white?text=Bag",
      rating: 4,
      reviews: 75,
    },
    {
      id: 3,
      name: "RGB Liquid Cooler",
      price: "$160",
      oldPrice: "$170",
      image: "https://placehold.co/200x200/blue/white?text=Cooler",
      rating: 4,
      reviews: 55,
    },
    {
      id: 4,
      name: "Small Bookshelf",
      price: "$360",
      image: "https://placehold.co/200x200/yellow/black?text=Shelf",
      rating: 5,
      reviews: 55,
    },
  ];

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Best Selling Products</h2>
        </div>
        <Button variant="outline">View All</Button>
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
            <div className="p-0"> {/* Padding reduced here */}
              <Skeleton className="w-full h-40 rounded-md" />
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-red-500">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through">
                  {product.oldPrice}
                </span>
              )}
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
            <div className="flex space-x-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 flex items-center px-4 py-2">
                <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white flex-1 px-4 py-2">
                Buy Now
              </Button>
            </div>
            </CardContent>
         </Card>        
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
