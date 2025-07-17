import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from '../Button';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

// Mock accessibility hook
jest.mock('../../../hooks/useAccessibility', () => ({
  useAccessibility: () => ({
    preferences: {
      reducedMotion: false,
      highContrast: false,
      fontSize: 'normal',
      screenReader: false
    }
  })
}));

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders button with correct text', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Button {...defaultProps} variant="primary" />);
      let button = screen.getByRole('button');
      expect(button).toHaveClass('bg-button-1');

      rerender(<Button {...defaultProps} variant="secondary" />);
      button = screen.getByRole('button');
      expect(button).toHaveClass('bg-button-2');

      rerender(<Button {...defaultProps} variant="outline" />);
      button = screen.getByRole('button');
      expect(button).toHaveClass('border');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Button {...defaultProps} size="small" />);
      let button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5');

      rerender(<Button {...defaultProps} size="medium" />);
      button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2');

      rerender(<Button {...defaultProps} size="large" />);
      button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3');
    });

    it('renders full width when specified', () => {
      render(<Button {...defaultProps} fullWidth />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      render(<Button {...defaultProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      render(<Button {...defaultProps} disabled />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      render(<Button {...defaultProps} loading />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('has correct ARIA attributes when loading', () => {
      render(<Button {...defaultProps} loading />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('uses custom aria-label when provided', () => {
      render(<Button {...defaultProps} ariaLabel="Custom Label" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('uses aria-describedby when provided', () => {
      render(<Button {...defaultProps} ariaDescribedBy="description-id" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-describedby', 'description-id');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Button {...defaultProps} />);
      
      const button = screen.getByRole('button');
      
      // Tab to focus the button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Press Enter to activate
      await user.keyboard('{Enter}');
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
      
      // Press Space to activate
      await user.keyboard(' ');
      expect(defaultProps.onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Button {...defaultProps} loading />);
      
      // Loading spinner should be present
      const spinner = screen.getByRole('button').querySelector('[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
    });

    it('shows loading text when loading', () => {
      render(<Button {...defaultProps} loading loadingText="Please wait..." />);
      
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('hides original text when loading', () => {
      render(<Button {...defaultProps} loading />);
      
      const originalText = screen.getByText('Test Button');
      expect(originalText).toHaveClass('sr-only');
    });
  });

  describe('Icon Support', () => {
    const icon = <span data-testid="icon">🚀</span>;

    it('renders icon on the left by default', () => {
      render(<Button {...defaultProps} icon={icon} />);
      
      const buttonContent = screen.getByRole('button').firstChild;
      const iconElement = screen.getByTestId('icon');
      
      expect(iconElement).toBeInTheDocument();
      expect(buttonContent.firstChild).toContainElement(iconElement);
    });

    it('renders icon on the right when specified', () => {
      render(<Button {...defaultProps} icon={icon} iconPosition="right" />);
      
      const buttonContent = screen.getByRole('button').firstChild;
      const iconElement = screen.getByTestId('icon');
      
      expect(iconElement).toBeInTheDocument();
      expect(buttonContent.lastChild).toContainElement(iconElement);
    });

    it('hides icon when loading', () => {
      render(<Button {...defaultProps} icon={icon} loading />);
      
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('has correct type attribute', () => {
      const { rerender } = render(<Button {...defaultProps} type="submit" />);
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');

      rerender(<Button {...defaultProps} type="reset" />);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });

    it('submits form when type is submit', () => {
      const handleSubmit = jest.fn();
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
