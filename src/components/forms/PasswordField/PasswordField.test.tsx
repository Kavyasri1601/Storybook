import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
  it('renders with password type by default', () => {
    render(<PasswordField placeholder="Enter password" />);

    expect(screen.getByPlaceholderText('Enter password')).toHaveAttribute('type', 'password');
  });

  it('renders label when provided', () => {
    render(<PasswordField label="Password" placeholder="test" />);

    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<PasswordField placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows required indicator when required', () => {
    render(<PasswordField label="Password" required placeholder="test" />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<PasswordField label="Password" error="Password too short" placeholder="test" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Password too short');
  });

  it('shows helper text when no error', () => {
    render(<PasswordField label="Password" helperText="Min 8 characters" placeholder="test" />);

    expect(screen.getByText('Min 8 characters')).toBeInTheDocument();
  });

  it('error takes precedence over helper text', () => {
    render(
      <PasswordField
        label="Password"
        error="Invalid"
        helperText="Min 8 characters"
        placeholder="test"
      />
    );

    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Min 8 characters')).not.toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<PasswordField placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    await user.type(input, 'secret123');

    expect(input).toHaveValue('secret123');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<PasswordField placeholder="test" onChange={handleChange} />);

    await user.type(screen.getByPlaceholderText('test'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<PasswordField label="Password" disabled placeholder="test" />);

    expect(screen.getByPlaceholderText('test')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies fullWidth class', () => {
    const { container } = render(<PasswordField fullWidth placeholder="test" />);

    expect(container.firstChild).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<PasswordField ref={ref} placeholder="test" />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it('has proper aria attributes when error', () => {
    render(<PasswordField error="Invalid" placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('uses custom id when provided', () => {
    render(<PasswordField id="my-password" label="Label" placeholder="test" />);

    expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'my-password');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<PasswordField size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('text-sm');

    rerender(<PasswordField size="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('text-base');

    rerender(<PasswordField size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('text-lg');
  });
});
