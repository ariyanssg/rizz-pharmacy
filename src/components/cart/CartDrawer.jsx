import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { useAccessibility } from '../../hooks/useAccessibility';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartSummary 
  } = useCart();
  const { preferences } = useAccessibility();
  
  const summary = getCartSummary();
  
  // Close drawer on escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Simplified animation variants based on reduced motion preference
  const drawerVariants = preferences.reducedMotion ? {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  } : {
    closed: { x: '100%' },
    open: { x: 0 }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const itemVariants = preferences.reducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 } // Reduced delay and duration
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-global-2 shadow-2xl z-50 flex flex-col"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={preferences.reducedMotion ? 
              { duration: 0.2 } : 
              { type: "spring", damping: 30, stiffness: 300 }
            }
            // Disable layout animations for better performance
            layout={false}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-global-1 border-opacity-20">
              <h2 className="text-xl font-neue-montreal font-semibold text-global-1">
                Shopping Cart ({summary.itemCount})
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-global-5 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-global-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-24 h-24 bg-global-5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-global-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-neue-montreal font-medium text-global-1 mb-2">Your cart is empty</h3>
                  <p className="text-global-1 opacity-70 mb-6">Add some products to get started</p>
                  <Button onClick={onClose} variant="secondary" size="medium">
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-global-5 rounded-xl p-4"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-global-1 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-neue-montreal font-medium text-global-1 truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-global-1 opacity-70 mt-1">
                            ${item.price.toFixed(2)}{item.period}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-global-8 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                -
                              </motion.button>
                              <span className="text-sm font-medium text-global-1 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-global-8 rounded-lg flex items-center justify-center text-global-1 hover:bg-opacity-80"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                +
                              </motion.button>
                            </div>
                            
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {items.length > 1 && (
                    <motion.button
                      onClick={clearCart}
                      className="w-full text-center text-red-400 hover:text-red-300 text-sm font-medium py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear Cart
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with Summary */}
            {items.length > 0 && (
              <motion.div
                className="border-t border-global-1 border-opacity-20 p-6 bg-global-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-global-1">
                    <span>Subtotal:</span>
                    <span>${summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-global-1">
                    <span>Tax:</span>
                    <span>${summary.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-global-1">
                    <span>Shipping:</span>
                    <span>{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</span>
                  </div>
                  {!summary.freeShippingEligible && (
                    <div className="text-xs text-button-2">
                      Add ${summary.freeShippingRemaining.toFixed(2)} more for free shipping
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-global-1 pt-2 border-t border-global-1 border-opacity-20">
                    <span>Total:</span>
                    <span>${summary.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button variant="secondary" size="large" className="w-full">
                  Checkout
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
