import HeroBanner from "@/components/home/HeroBanner";
import FlashSales from "@/components/home/FlashSales";
import CategoryBrowser from "@/components/home/CategoryBrowser";
import BestSelling from "@/components/home/BestSelling";
import MusicBanner from "@/components/home/MusicBanner";
import ExploreProducts from "@/components/home/ExploreProducts";
import NewArrivals from "@/components/home/NewArrivals";
import ServiceFeatures from "@/components/home/ServiceFeatures";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroBanner />
          <FlashSales />
          <CategoryBrowser />
          <BestSelling />
          <MusicBanner />
          <ExploreProducts />
          <NewArrivals />
          <ServiceFeatures />
        </div>
      </div>
    </div>
  );
};

export default Home;
