import { http, HttpResponse } from 'msw';

const productsList = {
  page: 1,
  pageSize: 12,
  total: 128,
  items: [
    {
      id: 'p_123',
      title: 'Everyday Sneakers',
      price: 79.99,
      rating: 4.3,
      inStock: true,
      thumbnailUrl: 'https://placehold.co/600x400',
    },
  ],
};

const productDetail = {
  id: 'p_123',
  title: 'Everyday Sneakers',
  price: 79.99,
  rating: 4.3,
  inStock: true,
  images: ['https://placehold.co/600x400'],
  description: 'Lightweight, breathable...',
  specs: { materials: 'mesh', weight: '250g' },
};

export const handlers = [
  http.get('/products', () => {
    console.log('MSW: Intercepted /products request');
    return HttpResponse.json(productsList);
  }),
  http.get('/products/:id', ({ params }) => {
    console.log('MSW: Intercepted /products/:id request', params);
    if (params.id === 'p_123') {
      return HttpResponse.json(productDetail);
    }
    return HttpResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }),
];
