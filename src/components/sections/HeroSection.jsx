import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection = () => {
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Text rotation for dynamic effect
  const healthGoals = [
    "health goals",
    "wellness journey", 
    "fitness dreams",
    "lifestyle changes"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % healthGoals.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [healthGoals.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(219, 80, 149, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textChangeVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center"
      style={{ y: y1, opacity, position: 'relative' }}
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"
        style={{ y: y2 }}
      />

      {/* Decorative frame overlay */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
      >
        <img
          src="/images/img_frame.png"
          alt="Decorative frame"
          className="w-full h-[573px] max-w-full object-cover"
        />
      </motion.div>
      
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.div variants={titleVariants} className="mb-8">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-impact font-normal leading-tight"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <span className="text-white block mb-2">
              Prescription treatments for your
            </span>
            <div className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  variants={textChangeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent inline-block"
                >
                  {healthGoals[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={subtitleVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Discover personalized treatments designed to help you achieve your unique health and wellness objectives with expert medical guidance.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={buttonVariants} className="mb-16">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-block"
          >
            <Button 
              variant="secondary" 
              size="large"
              className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none shadow-lg"
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                Find my treatment
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats or Features */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {[
            { number: "10K+", label: "Happy Patients" },
            { number: "50+", label: "Expert Doctors" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={subtitleVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + (index * 0.2), duration: 0.5, ease: "backOut" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
