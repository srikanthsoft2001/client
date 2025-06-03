import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { searchProducts, ProductItem } from '../api/api';
import ProductCard from '../components/product/ProductCard';

const ProductSearch = () => {
  const location = useLocation();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const { query } = queryString.parse(location.search);
    if (query && typeof query === 'string') {
      setSearchQuery(query);
      fetchProducts(query);
    }
  }, [location.search]);

  const fetchProducts = async (query: string) => {
    try {
      const results = await searchProducts(query);
      setProducts(results);
    } catch (error) {
      console.error('Search failed:', error);
      setProducts([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: "{searchQuery}"
      </h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
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
      )}
    </div>
  );
};

export default ProductSearch;
