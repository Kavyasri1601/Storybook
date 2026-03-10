import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders input with placeholder', () => {
    render(<TextField placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<TextField label="Email" placeholder="test" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<TextField label="Email" required placeholder="test" />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<TextField label="Email" error="Invalid email" placeholder="test" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows helper text when no error', () => {
    render(<TextField label="Email" helperText="Enter your email" placeholder="test" />);

    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('error takes precedence over helper text', () => {
    render(
      <TextField
        label="Email"
        error="Invalid"
        helperText="Enter your email"
        placeholder="test"
      />
    );

    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" placeholder="Enter name" />);

    const input = screen.getByPlaceholderText('Enter name');
    await user.type(input, 'John Doe');

    expect(input).toHaveValue('John Doe');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TextField placeholder="test" onChange={handleChange} />);

    await user.type(screen.getByPlaceholderText('test'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextField label="Email" disabled placeholder="test" />);

    expect(screen.getByPlaceholderText('test')).toBeDisabled();
    expect(screen.getByText('Email')).toHaveClass('opacity-50');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<TextField fullWidth placeholder="test" />);

    expect(container.firstChild).toHaveClass('w-full');
  });

  it('renders with left addon', () => {
    render(
      <TextField
        leftAddon={<span data-testid="left-addon">@</span>}
        placeholder="test"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
  });

  it('renders with right addon', () => {
    render(
      <TextField
        rightAddon={<span data-testid="right-addon">.com</span>}
        placeholder="test"
      />
    );

    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<TextField ref={ref} placeholder="test" />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it('has proper aria attributes when error', () => {
    render(<TextField error="Invalid" placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('uses custom id when provided', () => {
    render(<TextField id="my-input" label="Label" placeholder="test" />);

    expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'my-input');
  });
});
