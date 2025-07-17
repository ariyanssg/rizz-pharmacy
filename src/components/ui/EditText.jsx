import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditText = ({ 
  placeholder = '', 
  value,
  onChange,
  rightIcon,
  type = 'text',
  className = '',
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full py-3 sm:py-4 pl-4 sm:pl-6 pr-12 sm:pr-14 text-sm sm:text-base font-neue-montreal text-global-1 bg-transparent border border-global-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-1 transition-all duration-300"
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
          <img src={rightIcon} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      )}
    </div>
  );
};

EditText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rightIcon: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default EditText;