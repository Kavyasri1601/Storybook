import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar, NavbarLink, NavbarBrand } from './Navbar';

describe('Navbar', () => {
  it('renders as nav element', () => {
    render(<Navbar data-testid="navbar" />);

    expect(screen.getByTestId('navbar').tagName).toBe('NAV');
  });

  it('renders logo', () => {
    render(<Navbar logo={<span>Logo</span>} />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    render(
      <Navbar
        navItems={
          <>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
          </>
        }
      />
    );

    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <Navbar
        actions={<button>Action</button>}
      />
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Navbar>
        <span>Custom content</span>
      </Navbar>
    );

    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Navbar variant="solid" data-testid="navbar" />);
    expect(screen.getByTestId('navbar')).toHaveClass('shadow-sm');

    rerender(<Navbar variant="transparent" data-testid="navbar" />);
    expect(screen.getByTestId('navbar')).toHaveClass('bg-transparent');

    rerender(<Navbar variant="bordered" data-testid="navbar" />);
    expect(screen.getByTestId('navbar')).toHaveClass('border-b');
  });

  it('applies sticky positioning', () => {
    render(<Navbar sticky data-testid="navbar" />);

    expect(screen.getByTestId('navbar')).toHaveClass('sticky', 'top-0');
  });

  it('applies custom className', () => {
    render(<Navbar className="custom-class" data-testid="navbar" />);

    expect(screen.getByTestId('navbar')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Navbar ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });
});

describe('NavbarLink', () => {
  it('renders as anchor element', () => {
    render(<NavbarLink>Link</NavbarLink>);

    expect(screen.getByText('Link').tagName).toBe('A');
  });

  it('applies href', () => {
    render(<NavbarLink href="/page">Link</NavbarLink>);

    expect(screen.getByText('Link')).toHaveAttribute('href', '/page');
  });

  it('applies active styles', () => {
    render(<NavbarLink active>Active Link</NavbarLink>);

    expect(screen.getByText('Active Link')).toHaveClass('text-primary-600');
    expect(screen.getByText('Active Link')).toHaveAttribute('aria-current', 'page');
  });

  it('applies inactive styles by default', () => {
    render(<NavbarLink>Inactive Link</NavbarLink>);

    expect(screen.getByText('Inactive Link')).toHaveClass('text-secondary-600');
  });
});

describe('NavbarBrand', () => {
  it('renders as anchor element', () => {
    render(<NavbarBrand>Brand</NavbarBrand>);

    expect(screen.getByText('Brand').tagName).toBe('A');
  });

  it('defaults to home href', () => {
    render(<NavbarBrand>Brand</NavbarBrand>);

    expect(screen.getByText('Brand')).toHaveAttribute('href', '/');
  });

  it('applies custom href', () => {
    render(<NavbarBrand href="/home">Brand</NavbarBrand>);

    expect(screen.getByText('Brand')).toHaveAttribute('href', '/home');
  });

  it('applies brand styles', () => {
    render(<NavbarBrand>Brand</NavbarBrand>);

    expect(screen.getByText('Brand')).toHaveClass('text-xl', 'font-bold');
  });
});
