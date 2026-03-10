import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer, FooterColumn, FooterLink, FooterCopyright } from './Footer';

describe('Footer', () => {
  it('renders as footer element', () => {
    render(<Footer data-testid="footer" />);

    expect(screen.getByTestId('footer').tagName).toBe('FOOTER');
  });

  it('renders logo', () => {
    render(<Footer logo={<span>Logo</span>} />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders columns', () => {
    render(
      <Footer
        columns={
          <FooterColumn title="Links">
            <FooterLink>Link 1</FooterLink>
          </FooterColumn>
        }
      />
    );

    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
  });

  it('renders bottom section', () => {
    render(<Footer bottom={<span>Bottom content</span>} />);

    expect(screen.getByText('Bottom content')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Footer><span>Custom content</span></Footer>);

    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Footer variant="simple" data-testid="footer" />);
    expect(screen.getByTestId('footer')).toHaveClass('bg-white');

    rerender(<Footer variant="bordered" data-testid="footer" />);
    expect(screen.getByTestId('footer')).toHaveClass('border-t');

    rerender(<Footer variant="dark" data-testid="footer" />);
    expect(screen.getByTestId('footer')).toHaveClass('bg-secondary-900');
  });

  it('applies custom className', () => {
    render(<Footer className="custom-class" data-testid="footer" />);

    expect(screen.getByTestId('footer')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Footer ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });
});

describe('FooterColumn', () => {
  it('renders title', () => {
    render(<FooterColumn title="Column Title" />);

    expect(screen.getByText('Column Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FooterColumn>
        <FooterLink>Link 1</FooterLink>
        <FooterLink>Link 2</FooterLink>
      </FooterColumn>
    );

    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('title has correct heading level', () => {
    render(<FooterColumn title="Title" />);

    expect(screen.getByText('Title').tagName).toBe('H3');
  });
});

describe('FooterLink', () => {
  it('renders as list item with anchor', () => {
    render(<FooterLink>Link Text</FooterLink>);

    expect(screen.getByText('Link Text').tagName).toBe('A');
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('applies href', () => {
    render(<FooterLink href="/page">Link</FooterLink>);

    expect(screen.getByText('Link')).toHaveAttribute('href', '/page');
  });

  it('defaults to # href', () => {
    render(<FooterLink>Link</FooterLink>);

    expect(screen.getByText('Link')).toHaveAttribute('href', '#');
  });
});

describe('FooterCopyright', () => {
  it('renders with default content', () => {
    render(<FooterCopyright company="Test Co" />);

    const text = screen.getByText(/Test Co/);
    expect(text).toBeInTheDocument();
    expect(text.textContent).toContain('All rights reserved');
  });

  it('includes current year by default', () => {
    const currentYear = new Date().getFullYear();
    render(<FooterCopyright company="Test" />);

    expect(screen.getByText(new RegExp(String(currentYear)))).toBeInTheDocument();
  });

  it('can use custom year', () => {
    render(<FooterCopyright year={2020} company="Test" />);

    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it('can render custom children', () => {
    render(<FooterCopyright>Custom copyright text</FooterCopyright>);

    expect(screen.getByText('Custom copyright text')).toBeInTheDocument();
  });
});
