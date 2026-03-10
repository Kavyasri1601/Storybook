import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Typography, Heading1, Heading2, Text, Caption } from './Typography';

describe('Typography', () => {
  it('renders with default props', () => {
    render(<Typography>Default text</Typography>);

    const element = screen.getByText('Default text');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P'); // default is body1 = p
    expect(element).toHaveClass('text-base'); // body1 size
  });

  it('renders different variants with correct elements', () => {
    const { rerender } = render(<Typography variant="h1">Heading</Typography>);
    expect(screen.getByText('Heading').tagName).toBe('H1');

    rerender(<Typography variant="h2">Heading</Typography>);
    expect(screen.getByText('Heading').tagName).toBe('H2');

    rerender(<Typography variant="h3">Heading</Typography>);
    expect(screen.getByText('Heading').tagName).toBe('H3');

    rerender(<Typography variant="body1">Body</Typography>);
    expect(screen.getByText('Body').tagName).toBe('P');

    rerender(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption').tagName).toBe('SPAN');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Typography variant="h1">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-4xl', 'font-bold');

    rerender(<Typography variant="h2">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-3xl', 'font-semibold');

    rerender(<Typography variant="body2">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-sm');

    rerender(<Typography variant="overline">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('uppercase', 'tracking-wider');
  });

  it('applies color styles correctly', () => {
    const { rerender } = render(<Typography color="default">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-secondary-900');

    rerender(<Typography color="muted">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-secondary-500');

    rerender(<Typography color="primary">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-primary-600');

    rerender(<Typography color="error">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-error');

    rerender(<Typography color="success">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-success');

    rerender(<Typography color="warning">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-warning');
  });

  it('applies weight override correctly', () => {
    const { rerender } = render(<Typography weight="normal">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('font-normal');

    rerender(<Typography weight="medium">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('font-medium');

    rerender(<Typography weight="semibold">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('font-semibold');

    rerender(<Typography weight="bold">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('font-bold');
  });

  it('applies alignment correctly', () => {
    const { rerender } = render(<Typography align="left">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-left');

    rerender(<Typography align="center">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-center');

    rerender(<Typography align="right">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('text-right');
  });

  it('applies truncate class when truncate is true', () => {
    render(<Typography truncate>Long text to truncate</Typography>);

    expect(screen.getByText('Long text to truncate')).toHaveClass('truncate');
  });

  it('renders with custom element using as prop', () => {
    render(
      <Typography variant="h1" as="div">
        Custom element
      </Typography>
    );

    const element = screen.getByText('Custom element');
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveClass('text-4xl'); // still has h1 styles
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Text</Typography>);

    expect(screen.getByText('Text')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Typography ref={ref}>Ref text</Typography>);

    expect(ref).toHaveBeenCalled();
  });

  it('passes additional HTML attributes', () => {
    render(
      <Typography data-testid="typography" id="my-text">
        Text
      </Typography>
    );

    const element = screen.getByTestId('typography');
    expect(element).toHaveAttribute('id', 'my-text');
  });
});

describe('Convenience Components', () => {
  it('Heading1 renders h1 element with correct styles', () => {
    render(<Heading1>Heading 1</Heading1>);

    const element = screen.getByText('Heading 1');
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('text-4xl');
  });

  it('Heading2 renders h2 element with correct styles', () => {
    render(<Heading2>Heading 2</Heading2>);

    const element = screen.getByText('Heading 2');
    expect(element.tagName).toBe('H2');
    expect(element).toHaveClass('text-3xl');
  });

  it('Text renders p element with body1 styles', () => {
    render(<Text>Body text</Text>);

    const element = screen.getByText('Body text');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('text-base');
  });

  it('Caption renders span element with caption styles', () => {
    render(<Caption>Caption text</Caption>);

    const element = screen.getByText('Caption text');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('text-xs');
  });

  it('Convenience components accept additional props', () => {
    render(
      <Heading1 color="primary" className="custom">
        Styled heading
      </Heading1>
    );

    const element = screen.getByText('Styled heading');
    expect(element).toHaveClass('text-primary-600', 'custom');
  });
});
