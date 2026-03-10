import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Primitives/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Styled anchor component with support for external links and variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'nav', 'underline', 'brand'],
      description: 'Link visual variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    external: {
      control: 'boolean',
      description: 'External link (opens in new tab)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    href: {
      control: 'text',
      description: 'Link URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// Default
export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
};

// Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" variant="default">
        Default Link
      </Link>
      <Link href="#" variant="muted">
        Muted Link
      </Link>
      <Link href="#" variant="nav">
        Navigation Link
      </Link>
      <Link href="#" variant="underline">
        Underline Link
      </Link>
      <Link href="#" variant="brand">
        Bunzl Forgot Password Link
      </Link>
    </div>
  ),
};

export const DefaultVariant: Story = {
  args: {
    href: '#',
    variant: 'default',
    children: 'Default Link',
  },
};

export const MutedVariant: Story = {
  args: {
    href: '#',
    variant: 'muted',
    children: 'Muted Link',
  },
};

export const NavVariant: Story = {
  args: {
    href: '#',
    variant: 'nav',
    children: 'Navigation Link',
  },
};

export const UnderlineVariant: Story = {
  args: {
    href: '#',
    variant: 'underline',
    children: 'Underline Link',
  },
};

export const BunzlForgotpasswordLink: Story = {
  args: {
    href: '#',
    variant: 'brand',
    children: 'Forgot Password?',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bunzl Forgot Password link with bold navy blue (#003e7e) for login pages.',
      },
    },
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" size="sm">
        Small Link
      </Link>
      <Link href="#" size="md">
        Medium Link
      </Link>
      <Link href="#" size="lg">
        Large Link
      </Link>
    </div>
  ),
};

export const Small: Story = {
  args: {
    href: '#',
    size: 'sm',
    children: 'Small Link',
  },
};

export const Medium: Story = {
  args: {
    href: '#',
    size: 'md',
    children: 'Medium Link',
  },
};

export const Large: Story = {
  args: {
    href: '#',
    size: 'lg',
    children: 'Large Link',
  },
};

// External
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'External Link',
  },
};

export const ExternalWithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="https://example.com" external size="sm">
        Small External Link
      </Link>
      <Link href="https://example.com" external size="md">
        Medium External Link
      </Link>
      <Link href="https://example.com" external size="lg">
        Large External Link
      </Link>
    </div>
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true,
    children: 'Disabled Link',
  },
};

// In Context
export const InParagraph: Story = {
  render: () => (
    <p className="max-w-md text-secondary-700 dark:text-secondary-300">
      This is a paragraph with an{' '}
      <Link href="#" variant="default">
        inline link
      </Link>{' '}
      that you can click. You can also visit our{' '}
      <Link href="https://example.com" external>
        documentation
      </Link>{' '}
      for more information.
    </p>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <nav className="flex gap-6">
      <Link href="#" variant="nav">
        Home
      </Link>
      <Link href="#" variant="nav">
        Products
      </Link>
      <Link href="#" variant="nav">
        About
      </Link>
      <Link href="#" variant="nav">
        Contact
      </Link>
    </nav>
  ),
};

export const FooterLinks: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" variant="muted" size="sm">
        Privacy Policy
      </Link>
      <Link href="#" variant="muted" size="sm">
        Terms of Service
      </Link>
      <Link href="#" variant="muted" size="sm">
        Cookie Policy
      </Link>
    </div>
  ),
};
