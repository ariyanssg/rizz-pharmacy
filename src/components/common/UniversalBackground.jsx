import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const UniversalBackground = ({ 
  children, 
  className = '', 
  minHeight = 'min-h-screen',
  overlay = false,
  overlayOpacity = 'bg-black/20'
}) => {
  return (
    <div className={`relative w-full ${minHeight} overflow-hidden ${className}`}>
      {/* Universal Hero Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/Hero.png"
          alt="background"
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className={`absolute inset-0 ${overlayOpacity}`}></div>
        )}
      </div>

      {/* Decorative frame overlay */}
      <motion.div
        className="absolute top-44 -right-48 w-2/3 z-40 pointer-events-none opacity-20 flex justify-end"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{
          opacity: 0.4,
          x: 0,
          scale: 1,
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{
          scale: 1.05,
          opacity: 0.4,
          transition: { duration: 0.3 }
        }}
      >
        <motion.img
          src="/images/img_frame.png"
          alt="Decorative frame"
          className="w-full h-[573px] max-w-full object-contain ml-auto"
          animate={{
            y: [0, -10, 0],
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>



      {/* Players overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full z-50 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.3
        }}
      >
        <motion.img
          src="/images/PLAYERS.png"
          alt="Players decoration"
          className="w-full h-[2195.1px] max-w-full object-cover relative"
          initial={{
            x: "100%",
            opacity: 0
          }}
          animate={{
            x: "0%",
            opacity: 1
          }}
          transition={{
            x: {
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.4
            },
            opacity: {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.6
            }
          }}
          style={{
            mixBlendMode: 'normal',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
            filter: 'saturate(0.7) brightness(0.9) contrast(1.1)'
          }}
        />
      </motion.div>

      {/* Background fade layer - goes between Players and Vector7310 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-55 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1.0
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to right, rgba(28, 28, 28, 0.8) 0%, rgba(28, 28, 28, 0.6) 30%, rgba(28, 28, 28, 0.3) 50%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* Vector 7310 overlay - MOVED AFTER Players to ensure it's on top */}
      <motion.div
        className="absolute top-[570px] left-0 w-full z-[100] pointer-events-none overflow-hidden"
        style={{ zIndex: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.5 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.3
        }}
      >
        <motion.img
          src="/images/Vector7310.png"
          alt="Vector decoration"
          className="w-full h-[960px] max-w-full object-contain relative"
          initial={{
            x: "-100%",
            opacity: 0
          }}
          animate={{
            x: "0%",
            opacity: 1
          }}
          transition={{
            x: {
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.3
            },
            opacity: {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.5
            }
          }}
          style={{
            mixBlendMode: 'normal',
            filter: 'brightness(0) saturate(100%) invert(13%) sepia(85%) saturate(2900%) hue-rotate(315deg) brightness(100%) contrast(120%)',
            zIndex: 100,
            position: 'relative',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%)'
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-[110] w-full h-full">
        {children}
      </div>
    </div>
  );
};

UniversalBackground.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  minHeight: PropTypes.string,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.string
};

export default UniversalBackground;
