import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartSummary 
  } = useCart();
  
  const summary = getCartSummary();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout functionality would be implemented here');
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
              <span className="text-global-1">Shopping </span>
              <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Cart</span>
            </h1>
            <p className="text-xl text-global-1 opacity-80">
              {summary.itemCount} item{summary.itemCount !== 1 ? 's' : ''} in your cart
            </p>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-32 h-32 bg-global-5 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-global-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-neue-montreal font-semibold text-global-1 mb-4">
                Your cart is empty
              </h2>
              <p className="text-global-1 opacity-70 mb-8">
                Looks like you haven't added any products to your cart yet
              </p>
              <Button 
                onClick={() => navigate('/products')} 
                variant="secondary" 
                size="large"
              >
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  className="bg-global-5 rounded-2xl p-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-neue-montreal font-semibold text-global-1">
                      Cart Items
                    </h2>
                    {items.length > 1 && (
                      <button
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-global-8 rounded-xl p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-global-1 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-neue-montreal font-medium text-global-1 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-global-1 opacity-70 mb-3">
                              ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                              {item.period && item.period}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-global-1">Quantity:</span>
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="w-8 h-8 bg-global-5 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    -
                                  </motion.button>
                                  <span className="text-sm font-medium text-global-1 min-w-[30px] text-center">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="w-8 h-8 bg-global-5 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    +
                                  </motion.button>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-semibold text-button-2">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <motion.button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  className="bg-global-5 rounded-2xl p-6 sticky top-32"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-xl font-neue-montreal font-semibold text-global-1 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-global-1">
                      <span>Subtotal ({summary.itemCount} items):</span>
                      <span>${summary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-global-1">
                      <span>Tax:</span>
                      <span>${summary.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-global-1">
                      <span>Shipping:</span>
                      <span>{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</span>
                    </div>
                    {!summary.freeShippingEligible && (
                      <div className="text-sm text-button-2 bg-button-2 bg-opacity-10 p-3 rounded-lg">
                        Add ${summary.freeShippingRemaining.toFixed(2)} more for free shipping
                      </div>
                    )}
                    <div className="border-t border-global-1 border-opacity-20 pt-4">
                      <div className="flex justify-between text-xl font-semibold text-global-1">
                        <span>Total:</span>
                        <span className="text-button-2">${summary.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      variant="secondary"
                      size="large"
                      className="w-full"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      onClick={() => navigate('/products')}
                      variant="outline"
                      size="large"
                      className="w-full border-global-1 text-global-1"
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  {/* Security Features */}
                  <div className="mt-6 pt-6 border-t border-global-1 border-opacity-20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-button-2 rounded-full flex items-center justify-center">
                          <span className="text-button-1 text-xs">✓</span>
                        </div>
                        <span className="text-global-1">Secure Payment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-button-2 rounded-full flex items-center justify-center">
                          <span className="text-button-1 text-xs">✓</span>
                        </div>
                        <span className="text-global-1">Fast Delivery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-button-2 rounded-full flex items-center justify-center">
                          <span className="text-button-1 text-xs">✓</span>
                        </div>
                        <span className="text-global-1">Easy Returns</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-button-2 rounded-full flex items-center justify-center">
                          <span className="text-button-1 text-xs">✓</span>
                        </div>
                        <span className="text-global-1">24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
