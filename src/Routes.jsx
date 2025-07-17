import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLoadingSkeleton } from './components/ui/SkeletonLoader';

// Lazy load page components for better performance
const HomePage = React.lazy(() => import('./pages/Home'));
const ProductsPage = React.lazy(() => import('./pages/Products'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetail'));
const CartPage = React.lazy(() => import('./pages/Cart'));
const CategoryPage = React.lazy(() => import('./pages/Category'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const FAQsPage = React.lazy(() => import('./pages/FAQs'));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;