import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useAccessibility } from '../../hooks/useAccessibility';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  loadingText = 'Loading...',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const { preferences } = useAccessibility();
  const baseClasses = `font-neue-montreal font-bold rounded-[32px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-button-2 ${preferences.reducedMotion ? 'transition-none' : ''}`;
  
  const variants = {
    primary: 'bg-button-1 text-global-1 border-[2px] border-solid bg-[linear-gradient(141deg,#db4f95_0%,_#1944e7_100%)]',
    secondary: 'bg-button-2 text-button-1 border-[1px] border-solid bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)]',
    outline: 'border border-global-1 text-global-2 hover:bg-global-1 hover:text-global-2',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    medium: 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
    large: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  };
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'cursor-not-allowed opacity-50' : ''}
    ${loading ? 'pointer-events-none' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      variants={preferences.reducedMotion ? {} : buttonVariants}
      initial="initial"
      whileHover={disabled || loading || preferences.reducedMotion ? {} : "hover"}
      whileTap={disabled || loading || preferences.reducedMotion ? {} : "tap"}
      whileFocus={{
        scale: preferences.reducedMotion ? 1 : 1.02,
        boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)"
      }}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      <motion.span
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: preferences.reducedMotion ? 0 : 0.2 }}
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
        {icon && iconPosition === 'left' && !loading && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={loading ? 'sr-only' : ''}>
          {loading ? loadingText : children}
        </span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </motion.span>
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;