import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import CartIcon from '../cart/CartIcon';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.4,
        ease: "backOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
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
            <motion.img
              src="/images/img_ufc_rizz_logo.png"
              alt="UFC Rizz Logo"
              className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-[88px] lg:h-[110px]"
              whileHover={{ filter: "brightness(1.1)" }}
              transition={{ duration: 0.3 }}
            />
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
                className="flex flex-col gap-1 items-center"
              >
                <span className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                  Home
                </span>
                <motion.div
                  className="w-[32px] h-[2px] bg-button-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                />
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={1}
                className="flex gap-1 items-center cursor-pointer hover:text-button-2 transition-colors duration-300 group"
              >
                <span className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 group-hover:text-button-2">Category</span>
                <motion.img
                  src="/images/img_next_arrow.svg"
                  alt="arrow"
                  className="w-4 h-4 opacity-70"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={2}
                className="flex gap-1 items-center cursor-pointer hover:text-button-2 transition-colors duration-300 group"
              >
                <span className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 group-hover:text-button-2">Top Products</span>
                <motion.img
                  src="/images/img_next_arrow.svg"
                  alt="arrow"
                  className="w-4 h-4 opacity-70"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.span
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={3}
                className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer"
              >
                Contact Us
              </motion.span>

              <motion.span
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={4}
                className="text-sm xl:text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer"
              >
                FAQs
              </motion.span>
            </nav>

            <div className="flex items-center gap-6">
              <div className="flex gap-4 items-center transform translate-x-[430px]">
                <motion.img
                  src="/images/img_search.svg"
                  alt="search"
                  className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
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

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-global-1 hover:text-button-2 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
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
                    transition={{ duration: 0.3 }}
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
                      transition={{ duration: 0.3, delay: 0 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 18h16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.nav
                className="flex flex-col gap-4 p-6 bg-global-5 rounded-xl backdrop-blur-sm"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div
                  className="flex flex-col gap-1 items-start"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <span className="text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer">
                    Home
                  </span>
                  <motion.div
                    className="w-[24px] h-[2px] bg-button-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  />
                </motion.div>

                {['Category', 'Top Products', 'Contact Us', 'FAQs'].map((item, index) => (
                  <motion.span
                    key={item}
                    className="text-base font-neue-montreal font-medium text-global-1 hover:text-button-2 transition-colors duration-300 cursor-pointer"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.span>
                ))}

                <motion.div
                  className="flex flex-col gap-3 mt-4 pt-4 border-t border-global-1 border-opacity-20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
    </>
  );
};

export default Header;