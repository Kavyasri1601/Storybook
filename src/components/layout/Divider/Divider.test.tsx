import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders as hr element', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('is horizontal by default', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('can be vertical', () => {
    render(<Divider orientation="vertical" />);

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Divider variant="solid" />);
    expect(screen.getByRole('separator')).toHaveClass('border-solid');

    rerender(<Divider variant="dashed" />);
    expect(screen.getByRole('separator')).toHaveClass('border-dashed');

    rerender(<Divider variant="dotted" />);
    expect(screen.getByRole('separator')).toHaveClass('border-dotted');
  });

  it('applies spacing styles', () => {
    const { rerender } = render(<Divider spacing="none" />);
    expect(screen.getByRole('separator')).not.toHaveClass('my-2', 'my-4', 'my-6');

    rerender(<Divider spacing="sm" />);
    expect(screen.getByRole('separator')).toHaveClass('my-2');

    rerender(<Divider spacing="md" />);
    expect(screen.getByRole('separator')).toHaveClass('my-4');

    rerender(<Divider spacing="lg" />);
    expect(screen.getByRole('separator')).toHaveClass('my-6');
  });

  it('renders with label', () => {
    render(<Divider label="OR" />);

    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders label in a div container', () => {
    render(<Divider label="OR" />);

    // When there's a label, it renders as div not hr
    const separator = screen.getByRole('separator');
    expect(separator.tagName).toBe('DIV');
  });

  it('applies custom className', () => {
    render(<Divider className="custom-class" />);

    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Divider ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });

  it('applies horizontal styles correctly', () => {
    render(<Divider orientation="horizontal" />);

    expect(screen.getByRole('separator')).toHaveClass('w-full', 'border-t');
  });

  it('applies vertical styles correctly', () => {
    render(<Divider orientation="vertical" />);

    expect(screen.getByRole('separator')).toHaveClass('h-full', 'border-l');
  });

  it('has correct border color classes', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toHaveClass('border-secondary-200');
  });
});
