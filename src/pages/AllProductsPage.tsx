import { fetchAllProducts, ProductItem } from '@/api/api';
import ProductCard from '@/components/product/ProductCard';
import React, { useState, useEffect } from 'react';

 const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          <h1 className="text-2xl font-bold">ALL PRODUCTS</h1>
          <div>
            <p className="text-muted-foreground">
              Showing {products.length} products
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;