import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAccessibility } from '../../hooks/useAccessibility';

const CartIcon = ({ onClick, className = '' }) => {
  const { getItemCount } = useCart();
  const { preferences } = useAccessibility();
  const itemCount = getItemCount();

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={preferences.reducedMotion ? {} : { scale: 1.1 }}
      whileTap={preferences.reducedMotion ? {} : { scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        src="/images/img_icon_cart.svg"
        alt="cart"
        className="w-7 h-7"
        whileHover={preferences.reducedMotion ? {} : { rotate: -5 }}
        transition={{ duration: 0.2 }}
      />
      
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
            initial={{ scale: preferences.reducedMotion ? 0.9 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: preferences.reducedMotion ? 0.9 : 0, opacity: 0 }}
            transition={preferences.reducedMotion ? 
              { duration: 0.2 } : 
              { type: "spring", stiffness: 500, damping: 30 }
            }
            layout={false}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartIcon;
