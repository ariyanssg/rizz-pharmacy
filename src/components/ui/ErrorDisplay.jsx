import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { formatErrorMessage, getErrorRecoveryActions, ERROR_SEVERITY } from '../../hooks/useErrorHandler';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'inline', 
  showDetails = false,
  className = '' 
}) => {
  if (!error) return null;

  const recoveryActions = getErrorRecoveryActions(error);
  const formattedMessage = formatErrorMessage(error);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.CRITICAL:
        return 'text-red-400 bg-red-500 bg-opacity-10 border-red-500';
      case ERROR_SEVERITY.HIGH:
        return 'text-orange-400 bg-orange-500 bg-opacity-10 border-orange-500';
      case ERROR_SEVERITY.MEDIUM:
        return 'text-yellow-400 bg-yellow-500 bg-opacity-10 border-yellow-500';
      case ERROR_SEVERITY.LOW:
        return 'text-blue-400 bg-blue-500 bg-opacity-10 border-blue-500';
      default:
        return 'text-red-400 bg-red-500 bg-opacity-10 border-red-500';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.CRITICAL:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case ERROR_SEVERITY.HIGH:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ERROR_SEVERITY.MEDIUM:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const handleActionClick = (action) => {
    if (action.action === 'retry' && onRetry) {
      onRetry();
    } else if (typeof action.action === 'function') {
      action.action();
    }
  };

  if (variant === 'toast') {
    return (
      <motion.div
        className={`fixed top-4 right-4 max-w-md z-50 ${className}`}
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${getSeverityColor(error.severity)}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getSeverityIcon(error.severity)}
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">
                {error.type} Error
              </h3>
              <p className="mt-1 text-sm opacity-90">
                {formattedMessage}
              </p>
              {recoveryActions.length > 0 && (
                <div className="mt-3 flex space-x-2">
                  {recoveryActions.slice(0, 2).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      className="text-xs font-medium underline hover:no-underline"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'banner') {
    return (
      <motion.div
        className={`w-full border-l-4 p-4 ${getSeverityColor(error.severity)} ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {getSeverityIcon(error.severity)}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">
                {error.type} Error
              </h3>
              <p className="mt-1 text-sm opacity-90">
                {formattedMessage}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {recoveryActions.slice(0, 2).map((action, index) => (
              <Button
                key={index}
                onClick={() => handleActionClick(action)}
                variant="outline"
                size="small"
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="opacity-70 hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default inline variant
  return (
    <motion.div
      className={`rounded-lg border p-6 ${getSeverityColor(error.severity)} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getSeverityIcon(error.severity)}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium">
            {error.type} Error
          </h3>
          <p className="mt-2 opacity-90">
            {formattedMessage}
          </p>
          
          {showDetails && error.details && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">
                Error Details
              </summary>
              <pre className="mt-2 text-xs opacity-70 overflow-auto">
                {JSON.stringify(error.details, null, 2)}
              </pre>
            </details>
          )}
          
          {recoveryActions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {recoveryActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleActionClick(action)}
                  variant={index === 0 ? "secondary" : "outline"}
                  size="small"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Error List Component
export const ErrorList = ({ errors, onRetry, onDismiss, variant = 'inline' }) => {
  return (
    <AnimatePresence>
      {errors.map((error) => (
        <ErrorDisplay
          key={error.id}
          error={error}
          onRetry={() => onRetry && onRetry(error)}
          onDismiss={() => onDismiss && onDismiss(error.id)}
          variant={variant}
          className="mb-4"
        />
      ))}
    </AnimatePresence>
  );
};

export default ErrorDisplay;
