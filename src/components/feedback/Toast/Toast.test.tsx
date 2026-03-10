import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Toast, ToastContainer } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with message', () => {
    render(<Toast message="Test message" duration={0} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Toast title="Test Title" duration={0} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with title and message', () => {
    render(<Toast title="Title" message="Message" duration={0} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Toast variant="info" message="Info" duration={0} />);
    expect(screen.getByRole('alert')).toHaveClass('border-info/30');

    rerender(<Toast variant="success" message="Success" duration={0} />);
    expect(screen.getByRole('alert')).toHaveClass('border-success/30');

    rerender(<Toast variant="warning" message="Warning" duration={0} />);
    expect(screen.getByRole('alert')).toHaveClass('border-warning/30');

    rerender(<Toast variant="error" message="Error" duration={0} />);
    expect(screen.getByRole('alert')).toHaveClass('border-error/30');
  });

  it('shows dismiss button by default', () => {
    render(<Toast message="Test" duration={0} />);

    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  it('hides dismiss button when dismissible is false', () => {
    render(<Toast message="Test" dismissible={false} duration={0} />);

    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    vi.useRealTimers(); // Use real timers for user events
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    render(<Toast message="Test" onDismiss={handleDismiss} duration={0} />);

    await user.click(screen.getByRole('button', { name: /dismiss/i }));

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', () => {
    const handleDismiss = vi.fn();

    render(<Toast message="Test" duration={3000} onDismiss={handleDismiss} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not auto-dismiss when duration is 0', () => {
    const handleDismiss = vi.fn();

    render(<Toast message="Test" duration={0} onDismiss={handleDismiss} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  it('renders nothing when isVisible is false', () => {
    render(<Toast message="Test" isVisible={false} duration={0} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toast message="Test" className="custom-class" duration={0} />);

    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('has aria-live attribute for accessibility', () => {
    render(<Toast message="Test" duration={0} />);

    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
  });
});

describe('ToastContainer', () => {
  it('renders children', () => {
    render(
      <ToastContainer>
        <Toast message="Test" duration={0} />
      </ToastContainer>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies position styles', () => {
    const { rerender } = render(<ToastContainer position="top-right" data-testid="container" />);
    expect(screen.getByTestId('container')).toHaveClass('top-4', 'right-4');

    rerender(<ToastContainer position="bottom-left" data-testid="container" />);
    expect(screen.getByTestId('container')).toHaveClass('bottom-4', 'left-4');

    rerender(<ToastContainer position="top-center" data-testid="container" />);
    expect(screen.getByTestId('container')).toHaveClass('top-4', 'left-1/2');
  });

  it('has fixed positioning', () => {
    render(<ToastContainer data-testid="container" />);

    expect(screen.getByTestId('container')).toHaveClass('fixed');
  });

  it('applies custom className', () => {
    render(<ToastContainer className="custom-class" data-testid="container" />);

    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });
});
