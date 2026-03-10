import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content</Container>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies default size (xl)', () => {
    render(<Container data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-xl');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Container size="sm" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-sm');

    rerender(<Container size="md" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-md');

    rerender(<Container size="lg" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-lg');

    rerender(<Container size="xl" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-xl');

    rerender(<Container size="2xl" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-2xl');

    rerender(<Container size="full" data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-full');
  });

  it('centers by default', () => {
    render(<Container data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).toHaveClass('mx-auto');
  });

  it('does not center when centered is false', () => {
    render(<Container centered={false} data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).not.toHaveClass('mx-auto');
  });

  it('has padding by default', () => {
    render(<Container data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).toHaveClass('px-4');
  });

  it('removes padding when padded is false', () => {
    render(<Container padded={false} data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).not.toHaveClass('px-4');
  });

  it('applies custom className', () => {
    render(<Container className="custom-class" data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Container ref={ref}>Content</Container>);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('has full width', () => {
    render(<Container data-testid="container">Content</Container>);

    expect(screen.getByTestId('container')).toHaveClass('w-full');
  });
});
