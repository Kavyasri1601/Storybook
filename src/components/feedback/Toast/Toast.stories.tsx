import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Toast notification component for displaying temporary messages.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[450px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Toast variant',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Toast title',
    },
    message: {
      control: 'text',
      description: 'Toast message',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
    },
    duration: {
      control: 'number',
      description: 'Auto dismiss duration (ms)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Notification',
    message: 'This is a toast notification message.',
    duration: 0, // Disable auto-dismiss for stories
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'Here is some useful information for you.',
    duration: 0,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please review your input before continuing.',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    duration: 0,
  },
};

export const MessageOnly: Story = {
  args: {
    message: 'File uploaded successfully!',
    variant: 'success',
    duration: 0,
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Changes saved',
    variant: 'success',
    duration: 0,
  },
};

export const NonDismissible: Story = {
  args: {
    title: 'Processing...',
    message: 'Please wait while we process your request.',
    dismissible: false,
    duration: 0,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 min-w-[500px] p-8">
      <p className="text-secondary-500 dark:text-secondary-400 mb-4">All toast variants</p>
      <Toast variant="info" title="Information" message="This is an info toast message." duration={0} />
      <Toast variant="success" title="Success" message="This is a success toast message." duration={0} />
      <Toast variant="warning" title="Warning" message="This is a warning toast message." duration={0} />
      <Toast variant="error" title="Error" message="This is an error toast message." duration={0} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const WithContainer: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 min-w-[500px] p-8">
      <p className="text-secondary-500 dark:text-secondary-400 mb-4">Toast notifications in a container</p>
      <Toast variant="success" title="Saved!" message="Your changes have been saved successfully." duration={0} />
      <Toast variant="info" title="Info" message="New message received in your inbox." duration={0} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 min-w-[500px] p-8">
      <p className="text-secondary-500 dark:text-secondary-400 mb-4">Toast position variants (shown centered for demo)</p>
      <Toast variant="info" title="Top Left Position" message="This toast would appear in the top left corner." duration={0} />
      <Toast variant="success" title="Top Right Position" message="This toast would appear in the top right corner." duration={0} />
      <Toast variant="warning" title="Bottom Left Position" message="This toast would appear in the bottom left corner." duration={0} />
      <Toast variant="error" title="Bottom Right Position" message="This toast would appear in the bottom right corner." duration={0} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const CommonUseCases: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 min-w-[500px] p-8">
      <p className="text-secondary-500 dark:text-secondary-400 mb-4">Common use case examples</p>
      <Toast
        variant="success"
        title="Profile updated"
        message="Your profile information has been updated successfully."
        duration={0}
      />
      <Toast
        variant="error"
        title="Upload failed"
        message="The file could not be uploaded. Please check the file size and try again."
        duration={0}
      />
      <Toast
        variant="warning"
        title="Session expiring"
        message="Your session will expire in 5 minutes. Please save your work."
        duration={0}
      />
      <Toast
        variant="info"
        title="New feature"
        message="Check out our new dashboard features!"
        duration={0}
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
