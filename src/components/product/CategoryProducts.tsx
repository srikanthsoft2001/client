import React, { useEffect, useState } from 'react';
import { fetchAllProducts, ProductItem } from '@/api/api';
import ProductCard from './ProductCard';
import PaginatedList from '@/pages/PaginatedList';

interface CategoryProductsProps {
  category: string;
}
const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const all = await fetchAllProducts();
        const filtered = all.filter(
          (product) => product.category?.toLowerCase() === category.toLowerCase(),
        );
        setFilteredProducts(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!filteredProducts.length)
    return <div className="text-center py-10 text-gray-600">No products found.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Products</h1>

      <PaginatedList
        items={filteredProducts}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        renderItem={(product: ProductItem) => (
          <ProductCard
            key={product.id}
            item={{
              ...product,
              salePrice: String(product.salePrice),
              mainImageUrl: product.mainImageUrl,
              rating: product.rating,
            }}
          />
        )}
      />
    </div>
  );
};
export default CategoryProducts;
