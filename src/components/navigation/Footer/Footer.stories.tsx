import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterColumn, FooterLink, FooterCopyright } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Navigation/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Basic footer component for page footers.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'bordered', 'dark'],
      description: 'Visual variant',
      table: {
        defaultValue: { summary: 'bordered' },
      },
    },
    containerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Container width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    logo: (
      <div>
        <span className="text-xl font-bold text-secondary-900 dark:text-white">Brand</span>
        <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">
          Making the world a better place through constructing elegant hierarchies.
        </p>
      </div>
    ),
    columns: (
      <>
        <FooterColumn title="Solutions">
          <FooterLink href="#">Marketing</FooterLink>
          <FooterLink href="#">Analytics</FooterLink>
          <FooterLink href="#">Commerce</FooterLink>
          <FooterLink href="#">Insights</FooterLink>
        </FooterColumn>
        <FooterColumn title="Support">
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">Documentation</FooterLink>
          <FooterLink href="#">Guides</FooterLink>
          <FooterLink href="#">API Status</FooterLink>
        </FooterColumn>
        <FooterColumn title="Company">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Jobs</FooterLink>
          <FooterLink href="#">Partners</FooterLink>
        </FooterColumn>
      </>
    ),
    bottom: <FooterCopyright company="Brand Inc" />,
  },
};

export const Simple: Story = {
  args: {
    variant: 'simple',
    bottom: (
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <FooterCopyright company="Simple Co" />
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
            Privacy
          </a>
          <a href="#" className="text-sm text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
            Terms
          </a>
          <a href="#" className="text-sm text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
            Contact
          </a>
        </div>
      </div>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    columns: (
      <>
        <FooterColumn title="Product">
          <FooterLink href="#">Features</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">FAQ</FooterLink>
        </FooterColumn>
        <FooterColumn title="Company">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterColumn>
      </>
    ),
    bottom: <FooterCopyright company="Acme Inc" />,
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    logo: (
      <div>
        <span className="text-xl font-bold">Dark Brand</span>
        <p className="mt-2 text-sm text-secondary-400">
          Beautiful things happen in the dark.
        </p>
      </div>
    ),
    columns: (
      <>
        <FooterColumn title="Product">
          <FooterLink href="#">Features</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">Security</FooterLink>
        </FooterColumn>
        <FooterColumn title="Resources">
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Documentation</FooterLink>
          <FooterLink href="#">Support</FooterLink>
        </FooterColumn>
      </>
    ),
    bottom: (
      <FooterCopyright company="Dark Corp" />
    ),
  },
};

export const EcommerceFooter: Story = {
  render: () => (
    <Footer
      logo={
        <div>
          <span className="text-xl font-bold text-secondary-900 dark:text-white">ShopName</span>
          <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">
            Your one-stop shop for everything.
          </p>
          <div className="mt-4 flex space-x-4">
            {['facebook', 'twitter', 'instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-secondary-500 hover:text-secondary-700 dark:hover:text-white"
              >
                <span className="sr-only">{social}</span>
                <span className="text-xs uppercase">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
      }
      columns={
        <>
          <FooterColumn title="Shop">
            <FooterLink href="#">New Arrivals</FooterLink>
            <FooterLink href="#">Best Sellers</FooterLink>
            <FooterLink href="#">Sale</FooterLink>
            <FooterLink href="#">All Products</FooterLink>
          </FooterColumn>
          <FooterColumn title="Customer Service">
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Shipping Info</FooterLink>
            <FooterLink href="#">Returns</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
          </FooterColumn>
          <FooterColumn title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </FooterColumn>
        </>
      }
      bottom={
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <FooterCopyright company="ShopName" />
          <div className="flex items-center space-x-4 text-sm text-secondary-500">
            <span>Payment methods:</span>
            <div className="flex space-x-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 rounded text-xs"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  ),
};

export const MinimalFooter: Story = {
  args: {
    bottom: (
      <div className="text-center">
        <FooterCopyright company="Minimal Co" />
      </div>
    ),
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <Footer variant="bordered">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Subscribe to our newsletter
          </h3>
          <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">
            Get the latest updates and exclusive offers.
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg"
          />
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Subscribe
          </button>
        </div>
      </div>
    </Footer>
  ),
};

// Bunzl Footer
export const BunzlFooter: Story = {
  render: () => (
    <footer
      style={{
        maxWidth: '900px',
        height: '25.6px',
        margin: '40px auto 0',
        padding: '0 45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a
          href="#privacy-policy"
          style={{
            fontSize: '12px',
            color: '#003e7e',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Privacy Policy
        </a>
        <span style={{ color: '#003e7e', fontSize: '12px', fontWeight: 'bold' }}>|</span>
        <a
          href="#california-collection-notice"
          style={{
            fontSize: '12px',
            color: '#003e7e',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          California Collection Notice
        </a>
        <span style={{ color: '#003e7e', fontSize: '12px', fontWeight: 'bold' }}>|</span>
        <a
          href="#do-not-sell"
          style={{
            fontSize: '12px',
            color: '#003e7e',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Do Not Sell My Info
        </a>
        <span style={{ color: '#003e7e', fontSize: '12px', fontWeight: 'bold' }}>|</span>
        <a
          href="#terms-of-use"
          style={{
            fontSize: '12px',
            color: '#003e7e',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Terms of Use
        </a>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bunzl login page footer with Privacy Policy, California Collection Notice, Do Not Sell My Info, and Terms of Use links.',
      },
    },
  },
};
