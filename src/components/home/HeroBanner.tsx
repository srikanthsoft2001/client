import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroBanner = () => {
  return (
    <Card className="w-full border-0 shadow-none rounded-none overflow-hidden">
      <CardContent className="p-0 bg-black text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-6 md:p-12 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Up to 10% <br /> off Voucher
            </h2>
            <Button variant="outline" className="border-white text-primary">
              Shop Now
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/lovable-uploads/370f90b9-41d6-4d00-b2d1-72ba0d67d624.png"
              alt="iPhone Banner"
              className="w-full h-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroBanner;
