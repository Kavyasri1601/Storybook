import type { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from './PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Forms/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Password input field with show/hide toggle.',
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width field',
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
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters with 1 number',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <PasswordField label="Small" placeholder="Password" size="sm" />
      <PasswordField label="Medium" placeholder="Password" size="md" />
      <PasswordField label="Large" placeholder="Password" size="lg" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    fullWidth: true,
  },
};

export const NewPassword: Story = {
  args: {
    label: 'New password',
    placeholder: 'Create a strong password',
    helperText: 'Use 8 or more characters with a mix of letters, numbers & symbols',
    autoComplete: 'new-password',
    required: true,
  },
};

export const ConfirmPassword: Story = {
  args: {
    label: 'Confirm password',
    placeholder: 'Confirm your password',
    autoComplete: 'new-password',
    required: true,
  },
};

export const PasswordPair: Story = {
  render: () => (
    <div className="space-y-4">
      <PasswordField
        label="New password"
        placeholder="Create a strong password"
        helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
        required
        fullWidth
      />
      <PasswordField
        label="Confirm password"
        placeholder="Confirm your password"
        error="Passwords do not match"
        required
        fullWidth
      />
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Email address
        </label>
        <input
          type="email"
          className="form-input-base w-full"
          placeholder="you@example.com"
        />
      </div>
      <PasswordField
        label="Password"
        placeholder="Enter your password"
        fullWidth
      />
    </div>
  ),
};
