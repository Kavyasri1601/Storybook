import type { Meta, StoryObj } from '@storybook/react';
import { FormError } from './FormError';

const meta: Meta<typeof FormError> = {
  title: 'Forms/FormError',
  component: FormError,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form error message component with optional icon.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show error icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {
    message: 'This field is required',
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Please enter a valid email address',
    showIcon: false,
  },
};

export const WithChildren: Story = {
  args: {
    children: 'Password must be at least 8 characters',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a longer error message that explains what went wrong and how to fix it. Please check your input and try again.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const CommonErrors: Story = {
  render: () => (
    <div className="space-y-3">
      <FormError message="This field is required" />
      <FormError message="Please enter a valid email address" />
      <FormError message="Password must be at least 8 characters" />
      <FormError message="Passwords do not match" />
      <FormError message="Username is already taken" />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    message: undefined,
  },
};
