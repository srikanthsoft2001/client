import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fetchFlashSales, ProductItem } from '@/api/api';
import ProductCard from '../product/ProductCard';

const FlashSales: React.FC = () => {
  const [state, setState] = useState({
    allItems: [] as ProductItem[],
    filteredItems: [] as ProductItem[],
    loading: true,
    error: null as string | null,
  });

  const saleType = 'Flash';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await fetchFlashSales();
        const filtered = data.filter(
          (item) => item.saleType?.toLowerCase() === saleType.toLowerCase()
        );

        setState({
          allItems: data,
          filteredItems: filtered,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch flash sales data',
        }));
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const { loading, error, filteredItems } = state;
  const timeRemaining = {
    days: '03',
    hours: '23',
    minutes: '19',
    seconds: '56',
  };

  if (loading) {
    return <div>Loading flash sales...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Flash Sales</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="text-center">
                  <div className="text-sm">{label}</div>
                  <div className="font-bold">
                    {Object.values(timeRemaining)[i]}
                  </div>
                </div>
                {i < 3 && <span className="mx-1">:</span>}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <FiChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <FiChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((product) => (
            <ProductCard
              key={product.id}
              item={{
                ...product,
                salePrice: String(product.salePrice),
                mainImageUrl: product.mainImageUrl,
                rating: product.rating,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          No flash sale items found. Please check back later.
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default FlashSales;
