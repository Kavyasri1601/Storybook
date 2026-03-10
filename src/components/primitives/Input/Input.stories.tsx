import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search, DollarSign } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A base input component with support for different sizes, states, and addons.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'compact'],
      description: 'Input size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

export const BunzlInputfield: Story = {
  args: {
    size: 'compact',
    placeholder: 'Username',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bunzl Input field with fixed dimensions (271.5px × 40px) and sharp rectangular corners for login forms.',
      },
    },
  },
};

// States
export const WithError: Story = {
  args: {
    hasError: true,
    placeholder: 'Error state',
    defaultValue: 'Invalid input',
    size: 'compact',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    defaultValue: 'Cannot edit',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Read-only value',
  },
};

// With Addons
export const WithLeftIcon: Story = {
  args: {
    leftAddon: <Mail size={16} />,
    placeholder: 'Email address',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightAddon: <Search size={16} />,
    placeholder: 'Search...',
  },
};

export const WithLeftText: Story = {
  args: {
    leftAddon: 'https://',
    placeholder: 'example.com',
  },
};

export const WithRightText: Story = {
  args: {
    rightAddon: '.00',
    placeholder: '0',
  },
};

export const WithBothAddons: Story = {
  args: {
    leftAddon: <DollarSign size={16} />,
    rightAddon: 'USD',
    placeholder: '0.00',
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
  parameters: {
    layout: 'padded',
  },
};

// Types
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
    leftAddon: <Mail size={16} />,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    rightAddon: <Search size={16} />,
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};

// Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
      <Input size="compact" placeholder="Bunzl Input field (login form)" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input placeholder="Default state" />
      <Input hasError placeholder="Error state" />
      <Input disabled placeholder="Disabled state" />
      <Input readOnly defaultValue="Read-only state" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
