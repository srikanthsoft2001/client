import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory, ProductItem } from '../api/api';

const styles = {
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  } as React.CSSProperties,
  productItem: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
  productImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (categoryName) {
      fetchProductsByCategory(categoryName).then(setProducts);
    }
  }, [categoryName]);

  return (
    <div>
      <h1>{categoryName?.toUpperCase()} Products</h1>
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={styles.productItem}>
            <img
              src={product.mainImageUrl}
              alt={product.name}
              style={styles.productImage}
            />
            <h3>{product.name}</h3>
            <p>Original Price: ₹{product.originalPrice}</p>
            <p>Discount: {product.discountPercentage}</p>
            <p>Rating: {product.rating}</p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
