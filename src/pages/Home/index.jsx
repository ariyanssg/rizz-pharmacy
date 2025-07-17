import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import UniversalBackground from '../../components/common/UniversalBackground';
import Button from '../../components/ui/Button';
import EnhancedSearchView from '../../components/ui/EnhancedSearchView';
import { ProductGridSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorDisplay from '../../components/ui/ErrorDisplay';


import PagerIndicator from '../../components/ui/PagerIndicator';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import ShopByCategorySection from '../../components/sections/ShopByCategorySection';
import { useFilteredProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hooks for data fetching
  const { products, loading, error, filters, updateFilters } = useFilteredProducts();
  const { addToCart } = useCart();



  // Parallax scroll effects
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.2, 0.6]);

  const handleSearch = useCallback((searchTerm) => {
    updateFilters({ search: searchTerm });
  }, [updateFilters]);

  const handleCategoryChange = useCallback((category) => {
    updateFilters({ category });
  }, [updateFilters]);

  // Create category options for filtering - memoized
  const categoryOptions = useMemo(() => [
    { name: 'All', key: 'all' },
    { name: 'Weight Loss', key: 'weight-loss' },
    { name: 'Sexual Health', key: 'sexual-health' },
    { name: 'Brain Health', key: 'brain-health' },
    { name: 'Testosterone/HRT', key: 'testosterone-hrt' },
    { name: 'Athletic Performance', key: 'athletic-performance' },
    { name: 'Beauty and Hair Loss', key: 'beauty-hair' }
  ], []);





  const ProductCard = ({ product }) => {
    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(product);
    };

    const handleCardClick = () => {
      navigate(`/product/${product.id}`);
    };

    return (
      <motion.div
        className="bg-global-5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={handleCardClick}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 min-h-[120px]">
            <div className="flex-1">
              {product.badge && (
                <div className={`${product.badgeColor} text-xs font-neue-montreal font-medium text-global-1 px-4 py-2 rounded-full mb-4 inline-block`}>
                  {product.badge}
                </div>
              )}
              <h3 className="text-lg font-neue-montreal font-semibold text-global-1 bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent leading-tight">
                {product.title}
              </h3>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-400'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-global-1 opacity-70 ml-2">({product.rating.count})</span>
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex items-center hidden">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-global-8/20 flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6 min-h-[120px]">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-global-8/20 flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-auto">
            <div className="bg-slider-1 -mx-6 -mb-6 px-6 py-4 flex justify-between items-center">
              <div className="flex-1">
                <span className="text-sm font-neue-montreal font-medium text-global-1">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  {product.period && (
                    <span className="text-xs font-neue-montreal text-global-1 opacity-80">{product.period}</span>
                  )}
                </span>
              </div>
              <motion.button
                onClick={handleAddToCart}
                className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] p-3 rounded-xl hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/images/img_icon_dashboard.svg" alt="add to cart" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };



  return (
    <div className="w-full bg-global-2 min-h-screen">
      {/* Hero Section */}
      <UniversalBackground
        minHeight="min-h-screen sm:min-h-[110vh] md:min-h-[120vh] lg:min-h-[140vh] xl:min-h-[150vh]"
      >
        {/* Header */}
        <Header />

        {/* Desktop Hero Content - Original positioning preserved */}
        <motion.div
          className="absolute hidden lg:block"
          style={{ top: '320px', left: '400px' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="flex flex-col"
            style={{ width: '547px', height: '483.84px', gap: '33.84px' }}
          >
            <motion.div
              className="self-stretch justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className="text-white text-7xl font-normal font-impact capitalize leading-[96px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Prescription treatments for your
              </motion.div>
              <motion.div
                className="text-yellow-600 text-7xl font-normal font-impact capitalize leading-[96px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                health goals
              </motion.div>
            </motion.div>
            <motion.button
              className="w-[248px] rounded-[32px] bg-[#22242d] border-2 border-solid border-[#db5095] box-border h-[66px] flex flex-row items-center justify-center py-[10.7px] px-4 text-[22px] font-neue-montreal cursor-pointer touch-manipulation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "backOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(219, 80, 149, 0.4)",
                borderColor: "#ff6bb3"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              aria-label="Find my treatment"
            >
              <motion.span
                className="text-white relative leading-[140%] capitalize font-bold"
                whileHover={{ color: "#ffd700" }}
                transition={{ duration: 0.2 }}
              >
                Find my treatment
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Mobile Hero Content - Optimized for mobile screens */}
        <motion.div
          className="absolute lg:hidden inset-0 flex flex-col justify-between px-4 sm:px-6 pt-20 pb-6 min-h-screen"
          style={{ minHeight: '100dvh' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Main content centered */}
          <div className="flex-1 flex flex-col justify-center items-center text-center max-w-xs mx-auto">
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.h1
                className="text-white text-lg sm:text-xl font-normal font-impact capitalize leading-tight mb-1 px-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Prescription treatments for your
              </motion.h1>
              <motion.h1
                className="text-yellow-600 text-lg sm:text-xl font-normal font-impact capitalize leading-tight px-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                health goals
              </motion.h1>
            </motion.div>
            <motion.button
              className="w-full max-w-[280px] rounded-[32px] bg-[#22242d] border-2 border-solid border-[#db5095] box-border min-h-[44px] flex flex-row items-center justify-center py-2.5 px-5 text-sm font-neue-montreal cursor-pointer touch-manipulation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "backOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(219, 80, 149, 0.4)",
                borderColor: "#ff6bb3"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              aria-label="Find my treatment"
            >
              <motion.span
                className="text-white relative leading-[140%] capitalize font-bold"
                whileHover={{ color: "#ffd700" }}
                transition={{ duration: 0.2 }}
              >
                Find my treatment
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile Search Section - Fixed at bottom */}
          <motion.div
            className="flex-shrink-0 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div className="w-full max-w-sm mx-auto">
              <EnhancedSearchView
                placeholder="Search by product/treatment"
                leftIcon="/images/img_search.svg"
                onSearch={handleSearch}
                className="w-full shadow-2xl text-sm py-3 px-4"
                showResults={true}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Desktop Search Section */}
        <motion.div
          className="absolute inset-x-0 hidden lg:flex justify-center px-4 z-10"
          style={{ top: '1130px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="w-full max-w-4xl">
            <EnhancedSearchView
              placeholder="Search by product/treatment"
              leftIcon="/images/img_search.svg"
              onSearch={handleSearch}
              className="w-full shadow-2xl text-xl py-6 px-8"
              showResults={true}
            />
          </div>
        </motion.div>


      </UniversalBackground>

      <main id="main-content" role="main">
      {/* Background Artwork Section */}
      <div className="relative w-full bg-[url('/images/bg_artwork.png')] bg-cover bg-center bg-no-repeat">

      {/* Shop by Category Section */}
      <ShopByCategorySection />



      {/* Products Section */}
      <div className="w-full bg-[url('/images/img_bgartwork.png')] bg-cover bg-center py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[48px] font-impact font-normal text-center mb-12 sm:mb-16">
            <span className="text-global-1">Solutions for Your </span>
            <span className="bg-[linear-gradient(180deg,#c1842d_0%,_#ecc974_100%)] bg-clip-text text-transparent">Unique Health Goals</span>
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
            {categoryOptions.map((category, index) => (
              <Button
                key={index}
                variant={category.key === filters.category ? "secondary" : "outline"}
                size="medium"
                onClick={() => handleCategoryChange(category.key)}
                className={`px-6 py-3 text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                  category.key === filters.category
                    ? 'bg-button-2 text-button-1 border-button-2' :'border-global-1 text-global-1 hover:bg-global-1 hover:bg-opacity-10'
                }`}
              >
                {category.name}
              </Button>
            ))}
            <button className="border border-global-1 rounded-full p-3 sm:p-4 hover:bg-global-1 hover:bg-opacity-10 transition-all duration-300">
              <img src="/images/img_vector_white_a700_12x20.svg" alt="more" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : error ? (
              <div className="flex justify-center py-12">
                <ErrorDisplay
                  error={{ message: error, type: 'API', severity: 'MEDIUM' }}
                  onRetry={() => window.location.reload()}
                  variant="inline"
                  className="max-w-md"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <PagerIndicator
              totalPages={2}
              currentPage={currentSlide}
              onPageChange={setCurrentSlide}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <motion.div
        className="w-full bg-global-5 py-12 sm:py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Secure Payment Feature */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-start group cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  src="/images/img_icon_star.png"
                  alt="secure payment"
                  className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-md"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="text-lg sm:text-xl font-neue-montreal font-medium text-global-1"
                whileHover={{
                  color: "#e1bf6d",
                  transition: { duration: 0.3 }
                }}
              >
                Secure Payment
              </motion.span>
            </motion.div>

            {/* Online Support Feature */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-start group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  y: [-2, 2, -2],
                  transition: { duration: 0.6, repeat: 2 }
                }}
              >
                <motion.img
                  src="/images/img_customer_support.png"
                  alt="online support"
                  className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-md"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="text-lg sm:text-xl font-neue-montreal font-medium text-global-1"
                whileHover={{
                  color: "#e1bf6d",
                  transition: { duration: 0.3 }
                }}
              >
                Online Support
              </motion.span>
            </motion.div>

            {/* Free Shipping Feature */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-start group cursor-pointer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  transition: { duration: 0.8 }
                }}
              >
                <motion.img
                  src="/images/img_icon_star_40x40.png"
                  alt="free shipping"
                  className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-md"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="text-lg sm:text-xl font-neue-montreal font-medium text-global-1"
                whileHover={{
                  color: "#e1bf6d",
                  transition: { duration: 0.3 }
                }}
              >
                Free Shipping
              </motion.span>
            </motion.div>

            {/* Best Value Feature */}
            <motion.div
              className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-start group cursor-pointer"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  rotateY: [0, 180, 360],
                  transition: { duration: 0.8 }
                }}
              >
                <motion.img
                  src="/images/img_icon_star_1.png"
                  alt="best value"
                  className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-md"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="text-lg sm:text-xl font-neue-montreal font-medium text-global-1"
                whileHover={{
                  color: "#e1bf6d",
                  transition: { duration: 0.3 }
                }}
              >
                Best Value
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 100% Online Section - Enhanced with Parallax */}
      <motion.div
        className="relative w-full overflow-hidden py-32 sm:py-40 lg:py-48 xl:py-56 min-h-[800px] sm:min-h-[900px] lg:min-h-[1000px] xl:min-h-[1200px]"
        style={{ position: 'relative' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{ y: backgroundY }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/assets/images/image-1752700455825.png')" }}
          />
        </motion.div>

        {/* Dynamic Overlay with Parallax Opacity */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-xl"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center min-h-screen"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Enhanced Content Section */}
          <div className="text-center max-w-5xl w-full flex flex-col items-center justify-center py-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-impact font-normal mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white block mb-2">100% Online</span>
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Healthcare Experience
                </span>
              </motion.h2>

              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Get personalized treatments delivered to your door with expert medical guidance
              </motion.p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { icon: "🏥", title: "Expert Doctors", desc: "Licensed physicians" },
                { icon: "🚚", title: "Fast Delivery", desc: "2-3 day shipping" },
                { icon: "🔒", title: "100% Private", desc: "Discreet packaging" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)"
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 + (index * 0.1) }}
                >
                  <motion.div
                    className="text-5xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-lg">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      </div> {/* End Background Artwork Section */}

      </main>

      <Footer />
    </div>
  );
};

export default Home;