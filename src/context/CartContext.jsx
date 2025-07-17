import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity }]
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload.items || []
      };
    }

    default:
      return state;
  }
};

// Initial cart state
const initialState = {
  items: []
};

// Create cart context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rizz_pharmacy_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('rizz_pharmacy_cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id }
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart calculations
  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = (subtotal = getSubtotal()) => {
    return subtotal * 0.08; // 8% tax rate
  };

  const getShipping = (subtotal = getSubtotal()) => {
    return subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal + getTax(subtotal) + getShipping(subtotal);
  };

  // Check if item is in cart
  const isInCart = (id) => {
    return state.items.some(item => item.id === id);
  };

  // Get item quantity in cart
  const getItemQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Get cart item by id
  const getCartItem = (id) => {
    return state.items.find(item => item.id === id);
  };

  // Cart summary
  const getCartSummary = () => {
    const subtotal = getSubtotal();
    const tax = getTax(subtotal);
    const shipping = getShipping(subtotal);
    const total = subtotal + tax + shipping;

    return {
      itemCount: getItemCount(),
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round(total * 100) / 100,
      freeShippingEligible: subtotal > 100,
      freeShippingRemaining: subtotal > 100 ? 0 : Math.round((100 - subtotal) * 100) / 100
    };
  };

  const value = {
    // State
    items: state.items,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Getters
    getItemCount,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    isInCart,
    getItemQuantity,
    getCartItem,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
