import type { Meta, StoryObj } from '@storybook/react';
import { Mail, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'brand'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
    leftIcon: <Trash2 size={16} />,
  },
};

export const BunzlSignin: Story = {
  args: {
    variant: 'brand',
    children: 'Sign In',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bunzl Sign In button with navy blue (#003e7e), fixed dimensions (113.23px × 40px) and sharp rectangular corners for login pages.',
      },
    },
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// States
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Submit',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Mail size={16} />,
    children: 'Send Email',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRight size={16} />,
    children: 'Continue',
  },
};

export const IconOnly: Story = {
  args: {
    children: <Mail size={20} />,
    'aria-label': 'Send email',
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="brand">Bunzl Sign In</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">States</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
