import { fetchAllProducts, ProductItem } from '@/api/api';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';

const ExploreProducts = () => {
  const [state, setState] = useState({
    allItems: [] as ProductItem[],
    filteredItems: [] as ProductItem[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await fetchAllProducts();
        const filtered = data.filter(
          (item) => item.saleType?.toLowerCase() === 'none'
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
          error: 'Failed to fetch best selling products',
        }));
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const { loading, error, filteredItems } = state;

  if (loading) {
    return (
      <div className="text-center py-10">Loading best selling products...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Explore Our Products</h2>
        </div>
        <Button variant="outline">View All</Button>
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
        <div className="text-center py-10">No products found.</div>
      )}
    </section>
  );
};

export default ExploreProducts;
