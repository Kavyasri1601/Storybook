import type { Meta, StoryObj } from '@storybook/react';
import { FormLabel } from './FormLabel';

const meta: Meta<typeof FormLabel> = {
  title: 'Forms/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible form label component with required field indicator.',
      },
    },
  },
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Show required indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Label size',
    },
    htmlFor: {
      control: 'text',
      description: 'Associated input ID',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  args: {
    children: 'Email address',
  },
};

export const Required: Story = {
  args: {
    children: 'Email address',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Email address',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Email address',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Email address',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <FormLabel size="sm">Small Label</FormLabel>
      <FormLabel size="md">Medium Label</FormLabel>
      <FormLabel size="lg">Large Label</FormLabel>
    </div>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-1">
      <FormLabel htmlFor="email" required>
        Email address
      </FormLabel>
      <input
        id="email"
        type="email"
        className="form-input-base"
        placeholder="you@example.com"
      />
    </div>
  ),
};
