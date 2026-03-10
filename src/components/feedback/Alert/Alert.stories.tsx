import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert component for displaying important messages with different severity levels.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hide the icon',
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an informational message.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'A new software update is available . See what\'s new in version 2.0.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your subscription will expire in 3 days. Please renew to avoid interruption.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was an error processing your request. Please try again.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is a simple alert without a title.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your order has been placed.',
    hideIcon: true,
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Updates available',
    children: 'A new software update is available for download.',
    dismissible: true,
    onDismiss: () => alert('Alert dismissed!'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        This is an informational message with helpful details.
      </Alert>
      <Alert variant="success" title="Success">
        Your operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review this important notice before continuing.
      </Alert>
      <Alert variant="error" title="Error">
        An error occurred. Please try again later.
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Account Verification Required',
    children: (
      <>
        <p>
          Your account needs to be verified before you can access all features.
          This is required for security purposes and to ensure the safety of your data.
        </p>
        <p className="mt-2">
          Please check your email for the verification link or{' '}
          <a href="#" className="font-medium underline hover:no-underline">
            request a new one
          </a>
          .
        </p>
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    variant: 'info',
    title: 'New features available',
    children: (
      <div>
        <p className="mb-3">
          We have added new features to improve your experience. Check them out!
        </p>
        <div className="flex gap-2">
          <button className="text-sm font-medium underline hover:no-underline">
            Learn more
          </button>
          <button className="text-sm font-medium underline hover:no-underline">
            Dismiss
          </button>
        </div>
      </div>
    ),
  },
};

export const FormError: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="error" title="There were 2 errors with your submission">
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Your password must be at least 8 characters</li>
          <li>Your email address is not valid</li>
        </ul>
      </Alert>
    </div>
  ),
};
