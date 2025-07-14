import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroBanner = () => {
  return (
    <Card className="w-full border-0 shadow-none rounded-none overflow-hidden relative">
      {/* Background Video */}
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <CardContent className="relative z-10 p-0 text-white bg-black/50">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-6 md:p-12 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Up to 10% <br /> off Voucher
            </h2>
            <Button variant="outline" className="border-white text-primary">
              Shop Now
            </Button>
          </div>
          <div className="w-full md:w-1/2">{/* Optional second column content */}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroBanner;
