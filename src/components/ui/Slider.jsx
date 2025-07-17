import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Slider = ({ 
  children, 
  className = '',
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  ...props 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const childrenArray = React.Children.toArray(children);

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const scrollAmount = index * sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % childrenArray.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? childrenArray.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, currentIndex]);

  return (
    <div className={`relative w-full ${className}`} {...props}>
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 sm:gap-6 md:gap-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="flex-shrink-0 snap-start w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            {child}
          </div>
        ))}
      </div>
      
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-global-2 bg-opacity-50 text-global-1 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-global-2 bg-opacity-50 text-global-1 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showArrows: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
};

export default Slider;