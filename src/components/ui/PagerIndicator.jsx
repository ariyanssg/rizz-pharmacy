import React from 'react';
import PropTypes from 'prop-types';

const PagerIndicator = ({ 
  totalPages = 5, 
  currentPage = 0, 
  onPageChange,
  className = '',
  ...props 
}) => {
  const handlePageClick = (pageIndex) => {
    if (onPageChange) {
      onPageChange(pageIndex);
    }
  };

  return (
    <div className={`flex justify-center items-center gap-2 sm:gap-3 ${className}`} {...props}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index)}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            index === currentPage 
              ? 'bg-button-2 scale-125' :'bg-global-1 bg-opacity-30 hover:bg-opacity-60'
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

PagerIndicator.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

export default PagerIndicator;