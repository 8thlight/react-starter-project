export async function fetchProducts() {
  const response = await fetch('/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProductById(id: string) {
  const response = await fetch(`/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
}
