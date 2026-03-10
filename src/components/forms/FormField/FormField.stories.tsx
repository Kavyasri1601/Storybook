import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../../primitives/Input';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Wrapper component that combines label, input, and error/helper text.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email address',
    children: <Input placeholder="you@example.com" fullWidth />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email address',
    required: true,
    children: <Input placeholder="you@example.com" fullWidth />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
    children: <Input type="password" placeholder="Enter password" fullWidth />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    error: 'Please enter a valid email address',
    required: true,
    children: <Input placeholder="you@example.com" hasError fullWidth />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    disabled: true,
    children: <Input placeholder="you@example.com" disabled fullWidth />,
  },
};

export const WithoutLabel: Story = {
  args: {
    helperText: 'Enter your email to subscribe',
    children: <Input placeholder="you@example.com" fullWidth />,
  },
};

export const CompleteForm: Story = {
  render: () => (
    <div className="space-y-4">
      <FormField label="Full name" required>
        <Input placeholder="John Doe" fullWidth />
      </FormField>
      <FormField label="Email address" required>
        <Input type="email" placeholder="you@example.com" fullWidth />
      </FormField>
      <FormField
        label="Password"
        required
        helperText="Must be at least 8 characters"
      >
        <Input type="password" placeholder="Enter password" fullWidth />
      </FormField>
      <FormField
        label="Confirm password"
        required
        error="Passwords do not match"
      >
        <Input type="password" placeholder="Confirm password" hasError fullWidth />
      </FormField>
    </div>
  ),
};
