import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox input', () => {
    render(<Checkbox aria-label="test checkbox" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Checkbox label="Option" description="This is a description" />);

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Toggle me" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox label="Test" onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders as disabled', () => {
    render(<Checkbox label="Disabled" disabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByText('Disabled')).toHaveClass('opacity-50');
  });

  it('renders with error state', () => {
    render(<Checkbox label="Error" hasError />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('border-error');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Checkbox label="Small" size="sm" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-4', 'w-4');
    expect(screen.getByText('Small')).toHaveClass('text-sm');

    rerender(<Checkbox label="Medium" size="md" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-5', 'w-5');
    expect(screen.getByText('Medium')).toHaveClass('text-base');

    rerender(<Checkbox label="Large" size="lg" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-6', 'w-6');
    expect(screen.getByText('Large')).toHaveClass('text-lg');
  });

  it('renders with defaultChecked', () => {
    render(<Checkbox label="Checked" defaultChecked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox className="custom-class" label="Test" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses custom id when provided', () => {
    render(<Checkbox id="my-checkbox" label="Label" />);

    expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'my-checkbox');
  });

  it('works without label (standalone)', () => {
    render(<Checkbox aria-label="Standalone checkbox" />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Standalone checkbox');
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(
      <Checkbox label="Controlled" checked={false} onChange={handleChange} />
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();

    // Parent updates the checked prop
    rerender(<Checkbox label="Controlled" checked={true} onChange={handleChange} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('prevents click when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox label="Disabled" disabled onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox'));

    expect(handleChange).not.toHaveBeenCalled();
  });
});
