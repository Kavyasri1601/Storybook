import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders with children', () => {
    render(<Alert>Alert message</Alert>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Alert title="Alert Title">Message</Alert>);

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Title').tagName).toBe('H3');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-info/10');

    rerender(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-success/10');

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-warning/10');

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-error/10');
  });

  it('shows icon by default', () => {
    render(<Alert variant="info">Message</Alert>);

    const icon = screen.getByRole('alert').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('hides icon when hideIcon is true', () => {
    render(<Alert hideIcon>Message</Alert>);

    const alert = screen.getByRole('alert');
    // Should not have the icon container
    expect(alert.querySelector('svg.h-5.w-5')).not.toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Alert dismissible>Message</Alert>);

    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Message
      </Alert>
    );

    await user.click(screen.getByRole('button', { name: /dismiss/i }));

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not show dismiss button when not dismissible', () => {
    render(<Alert>Message</Alert>);

    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Alert className="custom-class">Message</Alert>);

    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Message</Alert>);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with title only', () => {
    render(<Alert title="Just a title" />);

    expect(screen.getByText('Just a title')).toBeInTheDocument();
  });

  it('renders with children only', () => {
    render(<Alert>Just content</Alert>);

    expect(screen.getByText('Just content')).toBeInTheDocument();
  });

  it('renders both title and children', () => {
    render(
      <Alert title="Title">
        Content
      </Alert>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
