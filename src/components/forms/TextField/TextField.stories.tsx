import type { Meta, StoryObj } from '@storybook/react';
import { Mail, DollarSign } from 'lucide-react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete text field with label, input, and error/helper text.',
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
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
};

export const Required: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'This will be your public display name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    disabled: true,
  },
};

export const WithLeftAddon: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    leftAddon: <Mail size={16} />,
  },
};

export const WithRightAddon: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
    leftAddon: <DollarSign size={16} />,
    rightAddon: 'USD',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextField label="Small" placeholder="Small input" size="sm" />
      <TextField label="Medium" placeholder="Medium input" size="md" />
      <TextField label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Full name',
    placeholder: 'John Doe',
    fullWidth: true,
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    leftAddon: <Mail size={16} />,
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    min: 0,
    max: 100,
    placeholder: '0',
    helperText: 'Enter a number between 0 and 100',
  },
};

export const CompleteLoginForm: Story = {
  render: () => (
    <div className="space-y-4">
      <TextField
        label="Email address"
        type="email"
        placeholder="you@example.com"
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        fullWidth
      />
    </div>
  ),
};
