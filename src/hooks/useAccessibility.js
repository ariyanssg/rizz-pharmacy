import { useEffect, useState, useCallback } from 'react';

// Accessibility preferences hook
export const useAccessibility = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal',
    screenReader: false
  });

  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPreferences(prev => ({ ...prev, reducedMotion: reducedMotionQuery.matches }));

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setPreferences(prev => ({ ...prev, highContrast: highContrastQuery.matches }));

    // Check for screen reader
    const screenReader = window.navigator.userAgent.includes('NVDA') || 
                         window.navigator.userAgent.includes('JAWS') || 
                         window.speechSynthesis;
    setPreferences(prev => ({ ...prev, screenReader: !!screenReader }));

    // Listen for changes
    const handleReducedMotionChange = (e) => {
      setPreferences(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    const handleHighContrastChange = (e) => {
      setPreferences(prev => ({ ...prev, highContrast: e.matches }));
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  const updateFontSize = useCallback((size) => {
    setPreferences(prev => ({ ...prev, fontSize: size }));
    document.documentElement.style.fontSize = size === 'large' ? '18px' : size === 'small' ? '14px' : '16px';
  }, []);

  return { preferences, updateFontSize };
};

// Keyboard navigation hook
export const useKeyboardNavigation = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return { isKeyboardUser };
};

// Focus management hook
export const useFocusManagement = () => {
  const [focusedElement, setFocusedElement] = useState(null);

  const trapFocus = useCallback((containerRef) => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        containerRef.current.blur();
      }
    };

    containerRef.current.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const restoreFocus = useCallback((element) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }, []);

  const saveFocus = useCallback(() => {
    setFocusedElement(document.activeElement);
  }, []);

  return { trapFocus, restoreFocus, saveFocus, focusedElement };
};

// Screen reader announcements
export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState([]);

  const announce = useCallback((message, priority = 'polite') => {
    const announcement = {
      id: Date.now(),
      message,
      priority,
      timestamp: new Date().toISOString()
    };

    setAnnouncements(prev => [...prev, announcement]);

    // Create live region for announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('class', 'sr-only');
    liveRegion.textContent = message;

    document.body.appendChild(liveRegion);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 1000);
  }, []);

  const announceNavigation = useCallback((pageName) => {
    announce(`Navigated to ${pageName}`, 'polite');
  }, [announce]);

  const announceAction = useCallback((action) => {
    announce(action, 'assertive');
  }, [announce]);

  return { announce, announceNavigation, announceAction, announcements };
};

// Color contrast utilities
export const useColorContrast = () => {
  const calculateContrast = useCallback((color1, color2) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    // Calculate relative luminance
    const getLuminance = (rgb) => {
      const { r, g, b } = rgb;
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) return 0;

    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }, []);

  const checkContrastCompliance = useCallback((foreground, background) => {
    const contrast = calculateContrast(foreground, background);
    return {
      contrast,
      aa: contrast >= 4.5,
      aaa: contrast >= 7,
      aaLarge: contrast >= 3,
      aaaLarge: contrast >= 4.5
    };
  }, [calculateContrast]);

  return { calculateContrast, checkContrastCompliance };
};

// ARIA utilities
export const useAria = () => {
  const generateId = useCallback((prefix = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const createAriaLabel = useCallback((text, context) => {
    return context ? `${text}, ${context}` : text;
  }, []);

  const createAriaDescription = useCallback((description, instructions) => {
    const parts = [description, instructions].filter(Boolean);
    return parts.join('. ');
  }, []);

  return { generateId, createAriaLabel, createAriaDescription };
};

// Accessibility testing utilities
export const useAccessibilityTesting = () => {
  const [violations, setViolations] = useState([]);

  const checkAccessibility = useCallback(async () => {
    // This would integrate with axe-core in a real implementation
    const mockViolations = [
      {
        id: 'color-contrast',
        impact: 'serious',
        description: 'Elements must have sufficient color contrast',
        nodes: []
      }
    ];

    setViolations(mockViolations);
    return mockViolations;
  }, []);

  const checkKeyboardNavigation = useCallback(() => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const issues = [];
    focusableElements.forEach((element, index) => {
      if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
        issues.push({
          element,
          issue: 'Missing accessible name',
          severity: 'high'
        });
      }
    });

    return issues;
  }, []);

  const checkSemanticStructure = useCallback(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues = [];

    let previousLevel = 0;
    headings.forEach((heading) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      if (currentLevel > previousLevel + 1) {
        issues.push({
          element: heading,
          issue: `Heading level skipped from h${previousLevel} to h${currentLevel}`,
          severity: 'medium'
        });
      }
      previousLevel = currentLevel;
    });

    return issues;
  }, []);

  return {
    violations,
    checkAccessibility,
    checkKeyboardNavigation,
    checkSemanticStructure
  };
};

export default useAccessibility;
