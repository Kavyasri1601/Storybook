import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormLabel } from './FormLabel';

describe('FormLabel', () => {
  it('renders with children', () => {
    render(<FormLabel>Email address</FormLabel>);

    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('renders as a label element', () => {
    render(<FormLabel>Label</FormLabel>);

    expect(screen.getByText('Label').tagName).toBe('LABEL');
  });

  it('shows required indicator when required', () => {
    render(<FormLabel required>Required field</FormLabel>);

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not show required indicator when not required', () => {
    render(<FormLabel>Optional field</FormLabel>);

    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('applies disabled styles', () => {
    render(<FormLabel disabled>Disabled label</FormLabel>);

    expect(screen.getByText('Disabled label')).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<FormLabel size="sm">Small</FormLabel>);
    expect(screen.getByText('Small')).toHaveClass('text-xs');

    rerender(<FormLabel size="md">Medium</FormLabel>);
    expect(screen.getByText('Medium')).toHaveClass('text-sm');

    rerender(<FormLabel size="lg">Large</FormLabel>);
    expect(screen.getByText('Large')).toHaveClass('text-base');
  });

  it('applies custom className', () => {
    render(<FormLabel className="custom-class">Label</FormLabel>);

    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });

  it('forwards htmlFor attribute', () => {
    render(<FormLabel htmlFor="my-input">Label</FormLabel>);

    expect(screen.getByText('Label')).toHaveAttribute('for', 'my-input');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<FormLabel ref={ref}>Ref Label</FormLabel>);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLLabelElement);
  });
});
