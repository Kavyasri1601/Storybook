import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Home, Mail, Heart } from 'lucide-react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the icon', () => {
    render(<Icon icon={Home} data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Icon icon={Home} size="xs" data-testid="icon" />);
    let icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '12');
    expect(icon).toHaveAttribute('height', '12');

    rerender(<Icon icon={Home} size="sm" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');

    rerender(<Icon icon={Home} size="md" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');

    rerender(<Icon icon={Home} size="lg" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');

    rerender(<Icon icon={Home} size="xl" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Icon icon={Home} color="default" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-secondary-900');

    rerender(<Icon icon={Home} color="muted" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-secondary-500');

    rerender(<Icon icon={Home} color="primary" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-primary-600');

    rerender(<Icon icon={Home} color="error" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-error');

    rerender(<Icon icon={Home} color="success" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-success');

    rerender(<Icon icon={Home} color="warning" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-warning');

    rerender(<Icon icon={Home} color="inherit" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-inherit');
  });

  it('is hidden from screen readers by default', () => {
    render(<Icon icon={Home} data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('has accessible label when provided', () => {
    render(<Icon icon={Mail} label="Email icon" data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Email icon');
    expect(icon).toHaveAttribute('role', 'img');
    expect(icon).toHaveAttribute('aria-hidden', 'false');
  });

  it('applies custom className', () => {
    render(<Icon icon={Home} className="custom-class" data-testid="icon" />);

    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });

  it('renders different Lucide icons', () => {
    const { rerender } = render(<Icon icon={Home} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon icon={Mail} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon icon={Heart} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('defaults to md size and inherit color', () => {
    render(<Icon icon={Home} data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
    expect(icon).toHaveClass('text-inherit');
  });

  it('forwards additional SVG attributes', () => {
    render(<Icon icon={Home} strokeWidth={3} data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('stroke-width', '3');
  });
});
