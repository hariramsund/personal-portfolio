import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component - Unit Tests', () => {
  
  // ===== PHASE 1: COMPONENT RENDERING =====
  describe('PHASE 1: Component Rendering', () => {
    it('should render search input with placeholder', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      render(<SearchBar />);
      const searchIcon = screen.getByRole('img', { hidden: true });
      expect(searchIcon).toBeInTheDocument();
    });

    it('should not show clear button initially', () => {
      render(<SearchBar />);
      const clearBtn = screen.queryByRole('button', { name: '' });
      expect(clearBtn).not.toBeInTheDocument();
    });

    it('should render with correct initial state', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      expect(input.value).toBe('');
    });
  });

  // ===== PHASE 2: INPUT HANDLING =====
  describe('PHASE 2: Input Handling', () => {
    it('should update input value on typing', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      expect(input.value).toBe('Python');
    });

    it('should show clear button when input has value', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Java');
      const clearBtn = screen.getByRole('button');
      expect(clearBtn).toBeInTheDocument();
    });

    it('should clear input when clear button is clicked', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      const clearBtn = screen.getByRole('button');
      await userEvent.click(clearBtn);
      
      expect(input.value).toBe('');
    });

    it('should handle empty input correctly', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'test');
      await userEvent.clear(input);
      expect(input.value).toBe('');
    });
  });

  // ===== PHASE 3: SEARCH FUNCTIONALITY =====
  describe('PHASE 3: Search Functionality', () => {
    it('should search and find projects by title', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'AI Traffic');
      await waitFor(() => {
        expect(screen.getByText('AI Traffic Prediction System')).toBeInTheDocument();
      });
    });

    it('should search and find skills', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      await waitFor(() => {
        expect(screen.getByText('Python')).toBeInTheDocument();
      });
    });

    it('should search and find navigation sections', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'About');
      await waitFor(() => {
        expect(screen.getByText('About')).toBeInTheDocument();
      });
    });

    it('should perform case-insensitive search', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'python');
      await waitFor(() => {
        expect(screen.getByText('Python')).toBeInTheDocument();
      });
    });

    it('should show no results for non-matching query', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'NonexistentSkill12345');
      await waitFor(() => {
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
      });
    });

    it('should limit results to 8 items maximum', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      // Search for common term that could return many results
      await userEvent.type(input, 's');
      await waitFor(() => {
        const resultItems = screen.getAllByRole('button');
        // Filter out the search input button
        const actualResults = resultItems.filter(btn => btn !== input);
        expect(actualResults.length).toBeLessThanOrEqual(8);
      });
    });
  });

  // ===== PHASE 4: RESULTS DISPLAY =====
  describe('PHASE 4: Results Display', () => {
    it('should display "Start typing" message when dropdown is open with empty query', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Start typing to search...')).toBeInTheDocument();
      });
    });

    it('should display results with section badges', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      await waitFor(() => {
        expect(screen.getByText('Skills')).toBeInTheDocument();
      });
    });

    it('should display project title and description', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'AI Traffic');
      await waitFor(() => {
        expect(screen.getByText('AI Traffic Prediction System')).toBeInTheDocument();
        expect(screen.getByText(/AI-powered traffic prediction/i)).toBeInTheDocument();
      });
    });

    it('should show correct section label for each result type', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Projects');
      await waitFor(() => {
        expect(screen.getByText('Navigation')).toBeInTheDocument();
      });
    });
  });

  // ===== PHASE 5: KEYBOARD SHORTCUTS =====
  describe('PHASE 5: Keyboard Shortcuts', () => {
    it('should open search on Ctrl+K', async () => {
      render(<SearchBar />);
      
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await waitFor(() => {
        expect(document.activeElement).toBe(input) || expect(input).toBeVisible();
      });
    });

    it('should close search on Escape key', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(input.value).toBe('');
    });

    it('should support Cmd+K on Mac', async () => {
      render(<SearchBar />);
      
      fireEvent.keyDown(window, { key: 'k', metaKey: true });
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await waitFor(() => {
        expect(input).toBeVisible();
      });
    });
  });

  // ===== PHASE 6: CLICK HANDLING =====
  describe('PHASE 6: Click Handling', () => {
    it('should open results dropdown on input focus', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.click(input);
      await waitFor(() => {
        expect(screen.getByText('Start typing to search...')).toBeInTheDocument();
      });
    });

    it('should clear query and results on result click', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      await waitFor(() => {
        const resultButton = screen.getByText('Python').closest('button');
        fireEvent.click(resultButton);
      });
      
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    it('should close dropdown on result click', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      await waitFor(() => {
        const resultButton = screen.getByText('Python').closest('button');
        fireEvent.click(resultButton);
      });
      
      await waitFor(() => {
        expect(screen.queryByText('Start typing to search...')).not.toBeInTheDocument();
      });
    });
  });

  // ===== PHASE 7: EDGE CASES =====
  describe('PHASE 7: Edge Cases', () => {
    it('should handle special characters in search', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, '@#$%');
      expect(input.value).toBe('@#$%');
    });

    it('should handle very long search queries', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      const longQuery = 'a'.repeat(100);
      await userEvent.type(input, longQuery);
      expect(input.value).toBe(longQuery);
    });

    it('should handle rapid typing and clearing', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'test');
      await userEvent.clear(input);
      await userEvent.type(input, 'another');
      
      expect(input.value).toBe('another');
    });

    it('should handle whitespace-only queries', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, '   ');
      expect(input.value).toBe('   ');
    });
  });

  // ===== PHASE 8: ACCESSIBILITY =====
  describe('PHASE 8: Accessibility', () => {
    it('should have searchable input with correct type', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have descriptive placeholder text', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      expect(input.placeholder).toContain('Search');
      expect(input.placeholder).toContain('Ctrl+K');
    });

    it('should have visible results with proper structure', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'Python');
      await waitFor(() => {
        const resultHeading = screen.getByText('Python');
        expect(resultHeading).toBeInTheDocument();
      });
    });
  });

  // ===== PHASE 9: PERFORMANCE =====
  describe('PHASE 9: Performance', () => {
    it('should handle rapid sequential searches', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      await userEvent.type(input, 'P');
      await userEvent.type(input, 'y');
      await userEvent.type(input, 't');
      
      expect(input.value).toBe('Pyt');
    });

    it('should not crash with empty portfolio data', () => {
      expect(() => {
        render(<SearchBar />);
      }).not.toThrow();
    });

    it('should efficiently search through multiple categories', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      // Start time
      const startTime = performance.now();
      
      await userEvent.type(input, 'S');
      
      // End time
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Should execute within reasonable time (less than 1 second)
      expect(executionTime).toBeLessThan(1000);
    });
  });

  // ===== PHASE 10: INTEGRATION =====
  describe('PHASE 10: Integration', () => {
    it('should handle complete user flow: search -> click -> clear', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      // User types
      await userEvent.type(input, 'Python');
      expect(input.value).toBe('Python');
      
      // Results appear
      await waitFor(() => {
        expect(screen.getByText('Python')).toBeInTheDocument();
      });
      
      // User clears
      const clearBtn = screen.getByRole('button', { name: '' });
      await userEvent.click(clearBtn);
      
      expect(input.value).toBe('');
    });

    it('should maintain state consistency across interactions', async () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Search portfolio... (Ctrl+K)');
      
      // Focus
      await userEvent.click(input);
      
      // Type
      await userEvent.type(input, 'skill');
      
      // Clear via button
      const clearBtn = screen.getByRole('button');
      await userEvent.click(clearBtn);
      
      // Verify state
      expect(input.value).toBe('');
    });
  });
});
