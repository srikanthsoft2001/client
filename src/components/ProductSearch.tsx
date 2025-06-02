// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';

// const ProductSearch = () => {
//   const location = useLocation();
//   const [products, setProducts] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const { query } = queryString.parse(location.search);
//     if (query && typeof query === 'string') {
//       setSearchQuery(query);
//       fetchProducts(query);
//     }
//   }, [location.search]);

//   const fetchProducts = async (query: string) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/products/search?query=${encodeURIComponent(
//           query
//         )}`
//       );
//       const contentType = response.headers.get('content-type');

//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`HTTP error ${response.status}: ${text}`);
//       }

//       if (!contentType?.includes('application/json')) {
//         const text = await response.text();
//         throw new Error(`Expected JSON, got: ${text}`);
//       }

//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Search failed:', error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-4">
//         Search Results for: "{searchQuery}"
//       </h2>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="border p-4 rounded shadow">
//               {product.mainImageUrl && (
//                 <img
//                   src={product.mainImageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover mb-2 rounded"
//                 />
//               )}
//               <h3 className="font-semibold">{product.name}</h3>
//               <p>
//                 Price: $
//                 {typeof product.salePrice === 'number'
//                   ? product.salePrice.toFixed(2)
//                   : typeof product.salePrice === 'string'
//                   ? product.salePrice
//                   : 'N/A'}
//               </p>
//               <p>Discount: {product.discountPercentage}%</p>
//               <p>Rating: {product.rating}</p>
//               <p>Sale Type: {product.saleType}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductSearch;
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { searchProducts, ProductItem } from '../api/api'; // adjust path

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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              {product.mainImageUrl && (
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <h3 className="font-semibold">{product.name}</h3>
              <p>
                Price: $
                {typeof product.salePrice === 'number'
                  ? product.salePrice.toFixed(2)
                  : typeof product.salePrice === 'string'
                  ? product.salePrice
                  : 'N/A'}
              </p>
              <p>Discount: {product.discountPercentage}%</p>
              <p>Rating: {product.rating}</p>
              <p>Sale Type: {product.saleType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
