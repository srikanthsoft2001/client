import React, { useState, useEffect } from 'react';
import { fetchAllProducts, ProductItem } from '@/api/api';
import ProductCard from '@/components/product/ProductCard';
import PaginatedList from '../PaginatedList';

interface CategoryProductsProps {
  category: string;
  subcategory?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category, subcategory }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Slugify function to normalize category strings
  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');

  // Format title for display
  const formatTitle = (text: string) =>
    text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/ And /gi, ' & ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) => slugify(product.category) === slugify(category),
      );
      setFilteredProducts(filtered);
    }
  }, [products, category, subcategory]);

  // Reset to first page on category/subcategory change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subcategory]);

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {formatTitle(category)}
            {subcategory && ` > ${formatTitle(subcategory)}`}
          </h1>
          <div>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 && 's'}
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <PaginatedList
            items={filteredProducts}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            renderItem={(product) => (
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
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
