import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import { ProductDetailSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { useProduct } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const cartQuantity = getItemQuantity(id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleUpdateCartQuantity = (newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const tabs = [
    { id: 'description', name: 'Description' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'usage', name: 'Usage Instructions' },
    { id: 'reviews', name: 'Reviews' }
  ];

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="w-full bg-global-2 min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <ErrorDisplay
            error={{
              message: error || 'Product not found',
              type: error ? 'API' : 'NOT_FOUND',
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
              <span className="text-global-1">{product.title}</span>
            </div>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square bg-global-5 rounded-2xl overflow-hidden flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {product.badge && (
                <div className={`${product.badgeColor} text-sm font-neue-montreal font-medium text-global-1 px-4 py-2 rounded-full inline-block`}>
                  {product.badge}
                </div>
              )}

              <h1 className="text-3xl lg:text-4xl font-neue-montreal font-bold text-global-1">
                {product.title}
              </h1>

              {product.rating && (
                <div className="flex items-center space-x-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-400'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-global-1 opacity-70">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              <div className="text-3xl font-bold text-button-2">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                {product.period && (
                  <span className="text-lg text-global-1 opacity-70 ml-2">{product.period}</span>
                )}
              </div>

              <p className="text-global-1 opacity-80 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                {cartQuantity > 0 ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-global-1">In cart: {cartQuantity}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
                        className="w-10 h-10 bg-global-5 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                      >
                        -
                      </button>
                      <span className="text-global-1 min-w-[40px] text-center">{cartQuantity}</span>
                      <button
                        onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}
                        className="w-10 h-10 bg-global-5 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-global-1">Quantity:</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="p-2 bg-global-5 border border-global-1 border-opacity-20 rounded-lg text-global-1"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    variant="secondary"
                    size="large"
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="large"
                    className="px-6 border-global-1 text-global-1"
                  >
                    ♡
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-global-1 border-opacity-20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-button-2 rounded-full flex items-center justify-center">
                    <span className="text-button-1 text-sm">✓</span>
                  </div>
                  <span className="text-global-1">FDA Approved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-button-2 rounded-full flex items-center justify-center">
                    <span className="text-button-1 text-sm">✓</span>
                  </div>
                  <span className="text-global-1">Fast Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-button-2 rounded-full flex items-center justify-center">
                    <span className="text-button-1 text-sm">✓</span>
                  </div>
                  <span className="text-global-1">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-button-2 rounded-full flex items-center justify-center">
                    <span className="text-button-1 text-sm">✓</span>
                  </div>
                  <span className="text-global-1">Expert Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border-b border-global-1 border-opacity-20">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-button-2 text-button-2'
                        : 'border-transparent text-global-1 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {selectedTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-global-1 opacity-80 text-lg leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-global-1 opacity-80 mt-4">
                    This product is designed to help you achieve your health goals with the highest quality ingredients and proven effectiveness.
                  </p>
                </div>
              )}
              
              {selectedTab === 'ingredients' && (
                <div className="text-global-1 opacity-80">
                  <p>Detailed ingredient information will be displayed here.</p>
                </div>
              )}
              
              {selectedTab === 'usage' && (
                <div className="text-global-1 opacity-80">
                  <p>Usage instructions and dosage information will be displayed here.</p>
                </div>
              )}
              
              {selectedTab === 'reviews' && (
                <div className="text-global-1 opacity-80">
                  <p>Customer reviews and ratings will be displayed here.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
