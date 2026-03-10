import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Divider component for separating content sections.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label in the middle',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Spacing around the divider',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <span className="text-sm text-secondary-500 mb-2 block">Solid</span>
        <Divider variant="solid" />
      </div>
      <div>
        <span className="text-sm text-secondary-500 mb-2 block">Dashed</span>
        <Divider variant="dashed" />
      </div>
      <div>
        <span className="text-sm text-secondary-500 mb-2 block">Dotted</span>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
};

export const WithLabelText: Story = {
  args: {
    label: 'Continue with',
  },
};

export const AllSpacings: Story = {
  render: () => (
    <div className="bg-secondary-100 dark:bg-secondary-800 p-4 rounded">
      <div className="bg-white dark:bg-secondary-900 p-4">Content above</div>
      <Divider spacing="none" />
      <div className="bg-white dark:bg-secondary-900 p-4">No spacing</div>
      <Divider spacing="sm" />
      <div className="bg-white dark:bg-secondary-900 p-4">Small spacing</div>
      <Divider spacing="md" />
      <div className="bg-white dark:bg-secondary-900 p-4">Medium spacing</div>
      <Divider spacing="lg" />
      <div className="bg-white dark:bg-secondary-900 p-4">Large spacing</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-20">
      <span className="text-secondary-700 dark:text-secondary-300">Item 1</span>
      <Divider orientation="vertical" spacing="md" />
      <span className="text-secondary-700 dark:text-secondary-300">Item 2</span>
      <Divider orientation="vertical" spacing="md" />
      <span className="text-secondary-700 dark:text-secondary-300">Item 3</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
        Section One
      </h3>
      <p className="text-secondary-600 dark:text-secondary-400 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore.
      </p>
      <Divider />
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
        Section Two
      </h3>
      <p className="text-secondary-600 dark:text-secondary-400 mt-2">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo.
      </p>
    </div>
  ),
};

export const LoginDivider: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <button className="w-full py-2 px-4 border border-secondary-300 dark:border-secondary-600 rounded-md text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        Continue with Google
      </button>
      <button className="w-full py-2 px-4 border border-secondary-300 dark:border-secondary-600 rounded-md text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        Continue with GitHub
      </button>
      <Divider label="or continue with email" />
      <input
        type="email"
        placeholder="Email address"
        className="form-input-base w-full"
      />
    </div>
  ),
};

export const BreadcrumbSeparator: Story = {
  render: () => (
    <nav className="flex items-center text-sm">
      <a href="#" className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
        Home
      </a>
      <Divider orientation="vertical" spacing="sm" className="h-4" />
      <a href="#" className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
        Products
      </a>
      <Divider orientation="vertical" spacing="sm" className="h-4" />
      <span className="text-secondary-900 dark:text-white">Category</span>
    </nav>
  ),
};
