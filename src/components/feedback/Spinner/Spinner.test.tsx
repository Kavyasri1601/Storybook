import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    expect(screen.getByText('Loading')).toHaveClass('sr-only');
  });

  it('uses custom label', () => {
    render(<Spinner label="Processing..." />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing...');
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Spinner size="xs" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-3', 'w-3');

    rerender(<Spinner size="sm" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-4', 'w-4');

    rerender(<Spinner size="md" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-6', 'w-6');

    rerender(<Spinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-8', 'w-8');

    rerender(<Spinner size="xl" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-12', 'w-12');
  });

  it('renders different colors', () => {
    const { rerender } = render(<Spinner color="primary" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('text-primary-600');

    rerender(<Spinner color="secondary" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('text-secondary-600');

    rerender(<Spinner color="white" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('text-white');

    rerender(<Spinner color="current" data-testid="spinner" />);
    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('text-current');
  });

  it('has animation class', () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('animate-spin');
  });

  it('applies custom className', () => {
    render(<Spinner className="custom-class" data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('svg is hidden from screen readers', () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId('spinner').querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
