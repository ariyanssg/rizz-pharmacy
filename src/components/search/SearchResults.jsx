import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductSearch } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const SearchResults = ({ query, isVisible, onClose }) => {
  const { products, loading, error, searchProducts, clearSearch } = useProductSearch();
  const { addToCart } = useCart();

  React.useEffect(() => {
    if (query && query.length > 2) {
      searchProducts(query);
    } else {
      clearSearch();
    }
  }, [query, searchProducts, clearSearch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full left-0 right-0 mt-2 bg-global-2 border border-global-1 border-opacity-20 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="medium" />
            <span className="ml-3 text-global-1">Searching...</span>
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-400">Error: {error}</p>
          </div>
        ) : products.length === 0 && query.length > 2 ? (
          <div className="p-4 text-center">
            <p className="text-global-1 opacity-70">No products found for "{query}"</p>
          </div>
        ) : products.length > 0 ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-neue-montreal font-semibold text-global-1">
                Search Results ({products.length})
              </h3>
              <button
                onClick={onClose}
                className="text-global-1 opacity-70 hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {products.slice(0, 5).map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-global-5 rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-global-1 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-neue-montreal font-medium text-global-1 truncate">
                      {product.title}
                    </h4>
                    <p className="text-xs text-global-1 opacity-70">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      {product.period}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    className="bg-button-2 text-button-1 px-3 py-1 rounded-lg text-xs font-medium hover:bg-opacity-90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              ))}
              {products.length > 5 && (
                <div className="text-center pt-2">
                  <p className="text-xs text-global-1 opacity-70">
                    Showing 5 of {products.length} results
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;
