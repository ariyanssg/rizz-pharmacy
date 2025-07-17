import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import { ProductGridSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { useProductsByCategory, useCategories } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProductsByCategory(category);
  const { categories } = useCategories();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('featured');

  const categoryInfo = categories[category];

  const sortOptions = [
    { name: 'Featured', key: 'featured' },
    { name: 'Price: Low to High', key: 'price-low' },
    { name: 'Price: High to Low', key: 'price-high' },
    { name: 'Name A-Z', key: 'name' },
    { name: 'Rating', key: 'rating' }
  ];

  const sortedProducts = React.useMemo(() => {
    if (!products) return [];
    
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [products, sortBy]);

  const ProductCard = ({ product }) => {
    const handleAddToCart = () => {
      addToCart(product);
    };

    return (
      <motion.div 
        className="bg-global-5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-square bg-global-1 overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          {product.badge && (
            <div className={`${product.badgeColor} text-xs font-neue-montreal font-medium text-global-1 px-3 py-1 rounded-full mb-3 inline-block`}>
              {product.badge}
            </div>
          )}
          
          <h3 className="text-lg font-neue-montreal font-semibold text-global-1 mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-sm text-global-1 opacity-70 mb-4 line-clamp-3">
            {product.description}
          </p>
          
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-400'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-global-1 opacity-70 ml-2">({product.rating.count})</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-button-2">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
              </span>
              {product.period && (
                <span className="text-xs text-global-1 opacity-70 ml-1">{product.period}</span>
              )}
            </div>
            
            <motion.button
              onClick={handleAddToCart}
              className="bg-button-2 text-button-1 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!categoryInfo && !loading) {
    return (
      <div className="w-full bg-global-2 min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <ErrorDisplay
            error={{ 
              message: 'Category not found', 
              type: 'NOT_FOUND', 
              severity: 'MEDIUM' 
            }}
            onRetry={() => navigate('/products')}
            variant="inline"
            className="max-w-md"
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-global-2 min-h-screen">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-sm text-global-1 opacity-70">
              <button onClick={() => navigate('/')} className="hover:opacity-100">
                Home
              </button>
              <span>/</span>
              <button onClick={() => navigate('/products')} className="hover:opacity-100">
                Products
              </button>
              <span>/</span>
              <span className="text-global-1">{categoryInfo?.name || category}</span>
            </div>
          </motion.nav>

          {/* Category Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-impact font-normal mb-6">
              <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">
                {categoryInfo?.name || category}
              </span>
            </h1>
            {categoryInfo?.description && (
              <p className="text-xl text-global-1 opacity-80 max-w-3xl mx-auto">
                {categoryInfo.description}
              </p>
            )}
          </motion.div>

          {/* Category Hero Section */}
          {categoryInfo && (
            <motion.div
              className={`${categoryInfo.gradient} rounded-3xl p-8 mb-12 relative overflow-hidden h-64`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10 h-full flex items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-neue-montreal font-bold text-global-1 mb-4">
                    {categoryInfo.name}
                  </h2>
                  <p className="text-lg text-global-1 opacity-90 max-w-2xl">
                    {categoryInfo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sort and Filter */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-global-1 opacity-70">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm text-global-1">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 bg-global-5 border border-global-1 border-opacity-20 rounded-lg text-global-1 focus:outline-none focus:border-button-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {loading ? (
              <ProductGridSkeleton count={12} />
            ) : error ? (
              <div className="flex justify-center py-20">
                <ErrorDisplay
                  error={{ message: error, type: 'API', severity: 'MEDIUM' }}
                  onRetry={() => window.location.reload()}
                  variant="inline"
                  className="max-w-md"
                />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-global-1 text-xl opacity-70 mb-6">
                  No products found in this category
                </p>
                <Button onClick={() => navigate('/products')} variant="secondary">
                  Browse All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
