import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders children', () => {
    render(
      <FormField>
        <input data-testid="input" />
      </FormField>
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <FormField label="Email" error="Invalid email">
        <input />
      </FormField>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows helper text when no error', () => {
    render(
      <FormField label="Email" helperText="Enter your email">
        <input />
      </FormField>
    );

    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('error takes precedence over helper text', () => {
    render(
      <FormField label="Email" error="Invalid" helperText="Enter your email">
        <input />
      </FormField>
    );

    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('applies disabled state to label', () => {
    render(
      <FormField label="Email" disabled>
        <input />
      </FormField>
    );

    expect(screen.getByText('Email')).toHaveClass('opacity-50');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField className="custom-class">
        <input />
      </FormField>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <FormField ref={ref}>
        <input />
      </FormField>
    );

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('connects label to input via htmlFor', () => {
    render(
      <FormField label="Email" fieldId="my-email">
        <input id="my-email" />
      </FormField>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'my-email');
  });
});
