import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import EnhancedSearchView from '../../components/ui/EnhancedSearchView';
import { ProductGridSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { useFilteredProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

const Products = () => {
  const { products, loading, error, filters, updateFilters } = useFilteredProducts();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categoryOptions = [
    { name: 'All Categories', key: 'all' },
    { name: 'Weight Loss', key: 'weight-loss' },
    { name: 'Sexual Health', key: 'sexual-health' },
    { name: 'Brain Health', key: 'brain-health' },
    { name: 'Testosterone/HRT', key: 'testosterone-hrt' },
    { name: 'Athletic Performance', key: 'athletic-performance' },
    { name: 'Beauty and Hair Loss', key: 'beauty-hair' }
  ];

  const sortOptions = [
    { name: 'Featured', key: 'featured' },
    { name: 'Price: Low to High', key: 'price-low' },
    { name: 'Price: High to Low', key: 'price-high' },
    { name: 'Name A-Z', key: 'name' },
    { name: 'Rating', key: 'rating' }
  ];

  const handleSearch = (searchTerm) => {
    updateFilters({ search: searchTerm });
  };

  const handleCategoryChange = (category) => {
    updateFilters({ category });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateFilters({ sortBy: sort });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    updateFilters({ minPrice: range[0], maxPrice: range[1] });
  };

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

  return (
    <div className="w-full bg-global-2 min-h-screen">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-impact font-normal mb-6">
              <span className="text-global-1">Our </span>
              <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl text-global-1 opacity-80 max-w-3xl mx-auto">
              Discover our comprehensive range of prescription treatments and wellness solutions
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EnhancedSearchView
              placeholder="Search products..."
              leftIcon="/images/img_search.svg"
              onSearch={handleSearch}
              className="max-w-2xl mx-auto"
              showResults={true}
            />
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-global-5 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-global-1 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 bg-global-8 border border-global-1 border-opacity-20 rounded-lg text-global-1 focus:outline-none focus:border-button-2"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-global-1 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full p-3 bg-global-8 border border-global-1 border-opacity-20 rounded-lg text-global-1 focus:outline-none focus:border-button-2"
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-global-1 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
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
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-global-1 text-xl opacity-70">No products found matching your criteria</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-global-1 opacity-70">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {products.map((product, index) => (
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
              </>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
