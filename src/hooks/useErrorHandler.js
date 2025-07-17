import { useState, useCallback } from 'react';

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  API: 'API',
  VALIDATION: 'VALIDATION',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

// Custom error class
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM, details = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Error handler hook
export const useErrorHandler = () => {
  const [errors, setErrors] = useState([]);

  // Add error to the list
  const addError = useCallback((error) => {
    const errorObj = error instanceof AppError ? error : new AppError(
      error.message || 'An unexpected error occurred',
      getErrorType(error),
      ERROR_SEVERITY.MEDIUM,
      { originalError: error }
    );

    setErrors(prev => [...prev, { ...errorObj, id: Date.now() }]);

    // Log error for debugging
    console.error('Error handled:', errorObj);

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // reportErrorToService(errorObj);
    }

    return errorObj;
  }, []);

  // Remove error by id
  const removeError = useCallback((id) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  // Get errors by type
  const getErrorsByType = useCallback((type) => {
    return errors.filter(error => error.type === type);
  }, [errors]);

  // Get errors by severity
  const getErrorsBySeverity = useCallback((severity) => {
    return errors.filter(error => error.severity === severity);
  }, [errors]);

  // Handle async operations with error catching
  const handleAsync = useCallback(async (asyncFn, errorMessage = 'Operation failed') => {
    try {
      return await asyncFn();
    } catch (error) {
      const appError = new AppError(
        errorMessage,
        getErrorType(error),
        ERROR_SEVERITY.MEDIUM,
        { originalError: error }
      );
      addError(appError);
      throw appError;
    }
  }, [addError]);

  // Retry mechanism
  const retry = useCallback(async (asyncFn, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFn();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          const appError = new AppError(
            `Operation failed after ${maxRetries} attempts`,
            getErrorType(error),
            ERROR_SEVERITY.HIGH,
            { originalError: error, attempts: maxRetries }
          );
          addError(appError);
          throw appError;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }, [addError]);

  return {
    errors,
    addError,
    removeError,
    clearErrors,
    getErrorsByType,
    getErrorsBySeverity,
    handleAsync,
    retry,
    hasErrors: errors.length > 0,
    criticalErrors: errors.filter(e => e.severity === ERROR_SEVERITY.CRITICAL),
    hasCriticalErrors: errors.some(e => e.severity === ERROR_SEVERITY.CRITICAL)
  };
};

// Helper function to determine error type
const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;

  // Network errors
  if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
    return ERROR_TYPES.NETWORK;
  }

  // HTTP status code based errors
  if (error.status || error.response?.status) {
    const status = error.status || error.response.status;
    
    if (status === 401) return ERROR_TYPES.AUTHENTICATION;
    if (status === 403) return ERROR_TYPES.AUTHORIZATION;
    if (status === 404) return ERROR_TYPES.NOT_FOUND;
    if (status >= 500) return ERROR_TYPES.SERVER;
    if (status >= 400) return ERROR_TYPES.API;
  }

  // Validation errors
  if (error.name === 'ValidationError' || error.message?.includes('validation')) {
    return ERROR_TYPES.VALIDATION;
  }

  return ERROR_TYPES.UNKNOWN;
};

// Error message formatter
export const formatErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      return 'Network connection error. Please check your internet connection and try again.';
    case ERROR_TYPES.AUTHENTICATION:
      return 'Authentication failed. Please log in again.';
    case ERROR_TYPES.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ERROR_TYPES.NOT_FOUND:
      return 'The requested resource was not found.';
    case ERROR_TYPES.SERVER:
      return 'Server error. Please try again later.';
    case ERROR_TYPES.VALIDATION:
      return error.message || 'Invalid input. Please check your data and try again.';
    case ERROR_TYPES.API:
      return error.message || 'API error. Please try again.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

// Error recovery suggestions
export const getErrorRecoveryActions = (error) => {
  const actions = [];

  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      actions.push(
        { label: 'Check Connection', action: () => window.navigator.onLine },
        { label: 'Retry', action: 'retry' },
        { label: 'Refresh Page', action: () => window.location.reload() }
      );
      break;
    case ERROR_TYPES.AUTHENTICATION:
      actions.push(
        { label: 'Log In', action: 'login' },
        { label: 'Refresh Page', action: () => window.location.reload() }
      );
      break;
    case ERROR_TYPES.NOT_FOUND:
      actions.push(
        { label: 'Go Back', action: () => window.history.back() },
        { label: 'Go Home', action: () => window.location.href = '/' }
      );
      break;
    case ERROR_TYPES.SERVER:
    case ERROR_TYPES.API:
      actions.push(
        { label: 'Retry', action: 'retry' },
        { label: 'Refresh Page', action: () => window.location.reload() }
      );
      break;
    default:
      actions.push(
        { label: 'Retry', action: 'retry' },
        { label: 'Refresh Page', action: () => window.location.reload() }
      );
  }

  return actions;
};

export default useErrorHandler;
