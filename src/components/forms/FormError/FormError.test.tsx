import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormError } from './FormError';

describe('FormError', () => {
  it('renders error message from message prop', () => {
    render(<FormError message="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders error message from children', () => {
    render(<FormError>Invalid input</FormError>);

    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  it('returns null when no message or children', () => {
    const { container } = render(<FormError />);

    expect(container.firstChild).toBeNull();
  });

  it('has role="alert" for accessibility', () => {
    render(<FormError message="Error" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows icon by default', () => {
    render(<FormError message="Error" />);

    const icon = screen.getByRole('alert').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('hides icon when showIcon is false', () => {
    render(<FormError message="Error" showIcon={false} />);

    const icon = screen.getByRole('alert').querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies error text color', () => {
    render(<FormError message="Error" />);

    expect(screen.getByRole('alert')).toHaveClass('text-error');
  });

  it('applies custom className', () => {
    render(<FormError message="Error" className="custom-class" />);

    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<FormError ref={ref} message="Error" />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLParagraphElement);
  });

  it('prefers message prop over children', () => {
    render(<FormError message="From message">From children</FormError>);

    expect(screen.getByText('From message')).toBeInTheDocument();
    expect(screen.queryByText('From children')).not.toBeInTheDocument();
  });
});
