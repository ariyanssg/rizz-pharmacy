import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SearchView = ({
  placeholder = 'Search...',
  onSearch,
  leftIcon,
  className = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut",
        delay: 0.2
      }
    },
    focused: {
      scale: 1.1,
      rotate: 15,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative w-full ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="relative flex items-center">
        {leftIcon && (
          <motion.div
            className="absolute left-6 z-10"
            variants={iconVariants}
            initial="initial"
            animate={isFocused ? "focused" : "animate"}
          >
            <motion.img
              src={leftIcon}
              alt="search"
              className="w-6 h-6"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full py-4 sm:py-6 pl-16 sm:pl-20 pr-4 text-sm sm:text-xl font-neue-montreal font-medium text-global-1 bg-white/10 backdrop-blur-md border rounded-[36px] shadow-[0px_4px_204px_#888888ff] focus:outline-none transition-all duration-300 ${
            isFocused
              ? 'border-white/40 bg-white/15'
              : 'border-white/20'
          }`}
          {...props}
        />
      </div>
    </motion.form>
  );
};

SearchView.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  leftIcon: PropTypes.string,
  className: PropTypes.string,
};

export default SearchView;