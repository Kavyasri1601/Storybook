import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('text-base'); // default size
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('text-sm');

    rerender(<Input size="md" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('text-base');

    rerender(<Input size="lg" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('text-lg');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error state', () => {
    render(<Input hasError placeholder="Error input" />);

    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('border-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<Input disabled placeholder="Disabled" />);

    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();

    await user.type(input, 'test');
    expect(input).toHaveValue('');
  });

  it('is read-only when readOnly prop is true', async () => {
    const user = userEvent.setup();
    render(<Input readOnly defaultValue="Read only" placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveAttribute('readonly');

    await user.type(input, ' more');
    expect(input).toHaveValue('Read only');
  });

  it('renders with left addon', () => {
    render(
      <Input
        leftAddon={<span data-testid="left-addon">@</span>}
        placeholder="test"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
  });

  it('renders with right addon', () => {
    render(
      <Input
        rightAddon={<span data-testid="right-addon">.com</span>}
        placeholder="test"
      />
    );

    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
  });

  it('renders with both addons', () => {
    render(
      <Input
        leftAddon={<span data-testid="left-addon">$</span>}
        rightAddon={<span data-testid="right-addon">USD</span>}
        placeholder="test"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Input fullWidth placeholder="test" />);

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="test" />);

    expect(screen.getByPlaceholderText('test')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} placeholder="test" />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number');
  });

  it('passes additional HTML attributes', () => {
    render(
      <Input
        placeholder="test"
        data-testid="custom-input"
        maxLength={10}
        autoComplete="off"
      />
    );

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });
});
