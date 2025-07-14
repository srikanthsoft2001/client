import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllProducts, ProductItem } from '@/api/api';
import ProductCard from '@/components/product/ProductCard';

const FlashSales: React.FC = () => {
  const [state, setState] = useState({
    allItems: [] as ProductItem[],
    filteredItems: [] as ProductItem[],
    loading: true,
    error: null as string | null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // or any number you want

  const saleType = 'Flash';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchAllProducts();
        const filtered = data.filter(
          (item) => item.saleType?.toLowerCase() === saleType.toLowerCase(),
        );

        setState({
          allItems: data,
          filteredItems: filtered,
          loading: false,
          error: null,
        });

        setCurrentPage(1); // Reset page on new data
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

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Pagination slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading flash sales...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Flash Sales</h2>
        </div>

        {/* Countdown + Navigation Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="text-center">
                  <div className="text-sm">{label}</div>
                  <div className="font-bold">{Object.values(timeRemaining)[i]}</div>
                </div>
                {i < 3 && <span className="mx-1">:</span>}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full transition-transform active:scale-95"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full transition-transform active:scale-95"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentItems.map((product) => (
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
        <div className="text-center py-10">No flash sale items found. Please check back later.</div>
      )}
    </section>
  );
};

export default FlashSales;
