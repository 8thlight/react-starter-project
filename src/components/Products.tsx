import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  inStock: boolean;
  thumbnailUrl: string;
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data.items))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <img src={product.thumbnailUrl} alt={product.title} width={80} />
            <div><strong>{product.title}</strong></div>
            <div>Price: ${product.price}</div>
            <div>Rating: {product.rating}</div>
            <div>{product.inStock ? 'In Stock' : 'Out of Stock'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
