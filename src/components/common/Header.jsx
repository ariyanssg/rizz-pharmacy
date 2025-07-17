import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import CartIcon from '../cart/CartIcon';
import CartDrawer from '../cart/CartDrawer';
import { useAccessibility } from '../../hooks/useAccessibility';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const { preferences } = useAccessibility();
  const navigate = useNavigate();
  const categoryDropdownRef = useRef(null);
  
  // Categories data from ShopByCategorySection
  const categories = [
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      gradient: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)',
      image: '/images/img_portrait_fitness_people.png'
    },
    {
      id: 'sexual-health',
      title: 'Sexual Health',
      gradient: 'linear-gradient(180deg, #f29b70 0%, #fbd197 100%)',
      image: '/images/img_2149165281_1.png'
    },
    {
      id: 'brain-health',
      title: 'Brain Health',
      gradient: 'linear-gradient(120.29deg, #97b5fb 0%, #f27070 83.5%)',
      image: '/images/img_handsome_young.png'
    },
    {
      id: 'testosterone-hrt',
      title: 'Testosterone HRT',
      gradient: 'linear-gradient(180deg, #ad70f2 0%, #9d37a2 100%)',
      image: '/images/img_portrait_seriou.png'
    },
    {
      id: 'athletic-performance',
      title: 'Athletic Performance',
      gradient: 'linear-gradient(120.29deg, #f27070 0%, #97b5fb 82%)',
      image: '/images/img_2149552437_1.png'
    },
    {
      id: 'beauty-hair',
      title: 'Beauty and Hair Loss',
      gradient: 'linear-gradient(180deg, #70cbf2 0%, #97b0fb 100%)',
      image: '/images/img_ayo_ogunseinde.png'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close category dropdown when mobile menu is toggled
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Close category dropdown when cart is toggled
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
  };
  
  const toggleCategoryDropdown = (e) => {
    e.preventDefault();
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };
  
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setIsCategoryDropdownOpen(false);
  };
  
  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Throttled scroll handler to improve performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);
  
  useEffect(() => {
    // Use passive listener for better scroll performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100); // Throttle to 10 times per second
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  // Simplified animation variants for better performance
  const headerVariants = preferences.reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  } : {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = preferences.reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { opacity: 0.9 }
  } : {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navItemVariants = preferences.reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { opacity: 0.8 }
  } : {
    initial: { y: -10, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + (i * 0.03), // Reduced delay between items
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -2,
      transition: { duration: 0.15 }
    }
  };

  const buttonVariants = preferences.reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { opacity: 0.9 },
    tap: { opacity: 0.8 }
  } : {
    initial: { scale: 0.9, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2 + (i * 0.03), // Reduced delay
        duration: 0.2, // Shorter duration
        ease: "easeOut" // Simpler easing function
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.15 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-global-2/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        role="banner"
      >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex items-center cursor-pointer mt-8"
          >
            <Link to="/">
              <motion.img
                src="/images/img_ufc_rizz_logo.png"
                alt="UFC Rizz Logo"
                className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-[88px] lg:h-[110px]"
                whileHover={{ filter: "brightness(1.1)" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <nav className="flex gap-6 xl:gap-8 items-center transform translate-x-[430px]">
              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={0}
                className="flex flex-col gap-1 items-center group"
              >
                <Link to="/" className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                  Home
                </Link>
                <div
                  className="w-[32px] h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={1}
                className="flex flex-col gap-1 items-center cursor-pointer hover:text-button-2 transition-colors duration-300 group relative"
                ref={categoryDropdownRef}
              >
                <a
                  href="#"
                  onClick={toggleCategoryDropdown}
                  className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 group-hover:text-button-2 flex items-center gap-1"
                >
                  Category
                  <motion.img
                    src="/images/img_next_arrow.svg"
                    alt="arrow"
                    className="w-4 h-4 opacity-70"
                    animate={{ rotate: isCategoryDropdownOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
                <div
                  className="w-[32px] h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
                
                {/* Category Dropdown */}
                <AnimatePresence>
                  {isCategoryDropdownOpen && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-64 bg-global-2 rounded-xl shadow-lg overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 grid gap-2">
                        {categories.map((category) => (
                          <motion.div
                            key={category.id}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-global-5/50 transition-colors duration-200"
                            onClick={() => handleCategoryClick(category.id)}
                            whileHover={{ x: 5 }}
                          >
                            <div 
                              className="w-8 h-8 rounded-full flex-shrink-0" 
                              style={{ background: category.gradient }}
                            ></div>
                            <span className="text-sm font-medium text-global-1">{category.title}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={2}
                className="flex flex-col gap-1 items-center cursor-pointer hover:text-button-2 transition-colors duration-300 group"
              >
                <div className="flex gap-1 items-center">
                  <Link to="/products" className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 group-hover:text-button-2">Top Products</Link>
                  <motion.img
                    src="/images/img_next_arrow.svg"
                    alt="arrow"
                    className="w-4 h-4 opacity-70"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div
                  className="w-[32px] h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={3}
                className="flex flex-col gap-1 items-center group"
              >
                <Link to="/contact" className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                  Contact Us
                </Link>
                <div
                  className="w-[32px] h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={4}
                className="flex flex-col gap-1 items-center group"
              >
                <Link to="/faqs" className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                  FAQs
                </Link>
                <div
                  className="w-[32px] h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            </nav>

            <div className="flex items-center gap-6">
              <div className="flex gap-4 items-center transform translate-x-[430px]">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src="/images/instagram.png"
                    alt="instagram"
                    className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100"
                  />
                </motion.a>
                <motion.img
                  src="/images/img_vector_gray_100.svg"
                  alt="user"
                  className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="flex items-center gap-3 transform translate-y-16 translate-x-48">
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={0}
                >
                  <Button variant="secondary" size="small" className="px-5 py-2 text-sm font-medium">
                    Sign Up
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={1}
                >
                  <Button variant="outline" size="small" className="px-5 py-2 text-sm font-medium border-global-1 text-global-1">
                    Log In
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={2}
                  className="flex items-center ml-2"
                >
                  <CartIcon onClick={toggleCart} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button - Improved touch target */}
          <motion.button
            className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-global-1 hover:text-button-2 transition-colors duration-300 touch-manipulation"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={preferences.reducedMotion ? {} : { scale: 1.1 }}
            whileTap={preferences.reducedMotion ? {} : { scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: preferences.reducedMotion ? {} : { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.path
                    key="close"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <motion.g key="menu">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.2, delay: 0 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 18h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
            className="lg:hidden mt-6 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: preferences.reducedMotion ? 0.1 : 0.25, ease: "easeInOut" }}
            // Use layout=false to prevent layout calculations
            layout={false}
          >
              <motion.nav
                className="flex flex-col gap-4 p-6 bg-global-5 rounded-xl backdrop-blur-sm"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <motion.div
                  className="flex flex-col gap-1 items-start"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <Link to="/" className="text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                    Home
                  </Link>
                  <motion.div
                    className="w-[24px] h-[2px] bg-button-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  />
                </motion.div>

                {/* Category with dropdown */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  <div className="mb-2">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      }}
                      className="flex items-center gap-2 text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer"
                    >
                      Category
                      <motion.img
                        src="/images/img_next_arrow.svg"
                        alt="arrow"
                        className="w-4 h-4 opacity-70"
                        animate={{ rotate: isCategoryDropdownOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isCategoryDropdownOpen && (
                      <motion.div
                        className="ml-4 mb-4 grid gap-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {categories.map((category, idx) => (
                          <motion.div
                            key={category.id}
                            className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-global-5/50 transition-colors duration-200"
                            onClick={() => handleCategoryClick(category.id)}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.05 * idx, duration: 0.2 }}
                            whileHover={{ x: 5 }}
                          >
                            <div 
                              className="w-6 h-6 rounded-full flex-shrink-0" 
                              style={{ background: category.gradient }}
                            ></div>
                            <span className="text-sm font-medium text-global-1">{category.title}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Other navigation items */}
                {[
                  { name: 'Top Products', path: '/products' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'FAQs', path: '/faqs' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + ((index + 1) * 0.05), duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={item.path}
                      className="text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="flex flex-col gap-3 mt-4 pt-4 border-t border-global-1 border-opacity-20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="secondary" size="medium" className="w-full justify-center">
                      Sign Up
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="medium" className="w-full justify-center border-global-1 text-global-1">
                      Log In
                    </Button>
                  </motion.div>
                  <motion.div
                    className="flex justify-center mt-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CartIcon onClick={toggleCart} />
                  </motion.div>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer - Only render when needed */}
      {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </motion.header>
    </>
  );
};

export default Header;
