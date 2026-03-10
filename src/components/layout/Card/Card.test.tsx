import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant (elevated)', () => {
    render(<Card data-testid="card">Content</Card>);

    expect(screen.getByTestId('card')).toHaveClass('shadow-elevation-2');
  });

  it('applies different variants', () => {
    const { rerender } = render(<Card variant="elevated" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('shadow-elevation-2');

    rerender(<Card variant="outlined" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('border');

    rerender(<Card variant="filled" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-secondary-50');
  });

  it('applies different paddings', () => {
    const { rerender } = render(<Card padding="none" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).not.toHaveClass('p-3', 'p-4', 'p-6');

    rerender(<Card padding="sm" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-3');

    rerender(<Card padding="md" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-4');

    rerender(<Card padding="lg" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-6');
  });

  it('applies hoverable styles', () => {
    render(<Card hoverable data-testid="card">Content</Card>);

    expect(screen.getByTestId('card')).toHaveClass('hover:shadow-elevation-3');
  });

  it('applies clickable styles', () => {
    render(<Card clickable data-testid="card">Content</Card>);

    expect(screen.getByTestId('card')).toHaveClass('cursor-pointer');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Card clickable onClick={handleClick}>Click me</Card>);

    await user.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>);

    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('has rounded corners', () => {
    render(<Card data-testid="card">Content</Card>);

    expect(screen.getByTestId('card')).toHaveClass('rounded-lg');
  });
});

describe('Card sub-components', () => {
  it('CardHeader renders correctly', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);

    expect(screen.getByTestId('header')).toHaveClass('mb-4');
  });

  it('CardTitle renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);

    expect(screen.getByText('Title').tagName).toBe('H3');
  });

  it('CardTitle can render as different heading levels', () => {
    const { rerender } = render(<CardTitle as="h1">Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H1');

    rerender(<CardTitle as="h2">Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H2');
  });

  it('CardDescription renders correctly', () => {
    render(<CardDescription>Description</CardDescription>);

    expect(screen.getByText('Description')).toHaveClass('text-secondary-500');
  });

  it('CardContent renders correctly', () => {
    render(<CardContent data-testid="content">Content</CardContent>);

    expect(screen.getByTestId('content')).toHaveClass('text-secondary-700');
  });

  it('CardFooter renders correctly', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);

    expect(screen.getByTestId('footer')).toHaveClass('mt-4', 'flex');
  });
});
