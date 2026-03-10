import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders with default props', () => {
    render(<Link href="/test">Click me</Link>);

    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Link href="#" variant="default">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-primary-600');

    rerender(
      <Link href="#" variant="muted">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-secondary-500');

    rerender(
      <Link href="#" variant="nav">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-secondary-700');

    rerender(
      <Link href="#" variant="underline">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('underline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Link href="#" size="sm">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-sm');

    rerender(
      <Link href="#" size="md">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-base');

    rerender(
      <Link href="#" size="lg">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-lg');
  });

  it('handles external links correctly', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows external icon for external links', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    );

    // The SVG icon should be present
    const svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not show external icon for internal links', () => {
    render(<Link href="/internal">Internal</Link>);

    const svg = screen.getByRole('link').querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(
      <Link href="/test" disabled data-testid="disabled-link">
        Disabled
      </Link>
    );

    const link = screen.getByTestId('disabled-link');
    expect(link).toHaveClass('pointer-events-none', 'opacity-50');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
  });

  it('applies custom className', () => {
    render(
      <Link href="#" className="custom-class">
        Link
      </Link>
    );

    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <Link ref={ref} href="#">
        Ref Link
      </Link>
    );

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes additional HTML attributes', () => {
    render(
      <Link href="#" data-testid="custom-link" title="Custom title">
        Link
      </Link>
    );

    const link = screen.getByTestId('custom-link');
    expect(link).toHaveAttribute('title', 'Custom title');
  });

  it('renders children correctly', () => {
    render(
      <Link href="#">
        <span data-testid="child">Child content</span>
      </Link>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('external icon size matches link size', () => {
    const { rerender } = render(
      <Link href="https://example.com" external size="sm">
        Small
      </Link>
    );
    let svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toHaveClass('h-3', 'w-3');

    rerender(
      <Link href="https://example.com" external size="md">
        Medium
      </Link>
    );
    svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toHaveClass('h-4', 'w-4');

    rerender(
      <Link href="https://example.com" external size="lg">
        Large
      </Link>
    );
    svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5');
  });
});
