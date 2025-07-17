import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import SearchResults from '../search/SearchResults';

const EnhancedSearchView = ({
  placeholder = 'Search...',
  onSearch,
  leftIcon,
  className = '',
  showResults = true,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (onSearch) {
      onSearch(value);
    }
    
    if (showResults && value.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (showResults && searchValue.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleCloseResults = () => {
    setShowSearchResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <motion.div
      ref={searchRef}
      className={`relative w-full ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <form onSubmit={handleSubmit} className="relative">
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
          
          {/* Clear button */}
          {searchValue && (
            <motion.button
              type="button"
              onClick={() => {
                setSearchValue('');
                setShowSearchResults(false);
                if (onSearch) onSearch('');
              }}
              className="absolute right-6 text-global-1 opacity-70 hover:opacity-100"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </form>

      {/* Search Results */}
      {showResults && (
        <SearchResults
          query={searchValue}
          isVisible={showSearchResults}
          onClose={handleCloseResults}
        />
      )}
    </motion.div>
  );
};

EnhancedSearchView.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  leftIcon: PropTypes.string,
  className: PropTypes.string,
  showResults: PropTypes.bool,
};

export default EnhancedSearchView;
