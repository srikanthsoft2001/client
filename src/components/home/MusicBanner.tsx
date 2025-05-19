<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
>>>>>>> b124c97441782773c90c46b68806a315c36ffba6

const MusicBanner = () => {
  return (
    <section className="py-10">
      <Card className="w-full border-0 shadow-none bg-black text-white rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-green-500">Categories</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Enhance Your <br /> Music Experience
              </h2>
              <div className="flex space-x-4 mt-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                ))}
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white mt-6">
                Buy Now
              </Button>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <img
                src="https://placehold.co/500x300/black/white?text=Speaker"
                alt="Bluetooth Speaker"
                className="w-full h-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MusicBanner;
