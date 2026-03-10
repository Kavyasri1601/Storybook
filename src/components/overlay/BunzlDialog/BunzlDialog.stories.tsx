import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BunzlDialog } from './BunzlDialog';
import { Button } from '../../primitives/Button';
import { Input } from '../../primitives/Input';

const meta: Meta<typeof BunzlDialog> = {
  title: 'Overlay/BunzlDialog',
  component: BunzlDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogDemo = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <BunzlDialog {...args} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'Dialog Title',
    description: 'This is a description of the dialog.',
    children: (
      <div className="space-y-4">
        <p className="text-secondary-700 dark:text-secondary-300">
          Dialog content goes here. You can put any content inside the dialog.
        </p>
      </div>
    ),
  },
};

export const SignInDialog: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'Sign In',
    description: 'Enter your credentials to sign in.',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Email
          </label>
          <Input type="email" placeholder="you@example.com" fullWidth />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Password
          </label>
          <Input type="password" placeholder="Enter your password" fullWidth />
        </div>
        <Button fullWidth>Sign In</Button>
      </div>
    ),
  },
};

export const Small: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'Small Dialog',
    size: 'sm',
    children: <p>This is a small dialog.</p>,
  },
};

export const Large: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'Large Dialog',
    size: 'lg',
    children: <p>This is a large dialog with more content space.</p>,
  },
};

export const NoCloseButton: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <div className="space-y-4">
        <p>This dialog has no close button. Click outside to close.</p>
      </div>
    ),
  },
};

export const EmailDialog: Story = {
  render: (args) => <DialogDemo {...args} />,
  args: {
    title: 'Send Email',
    description: 'Enter the recipient email address.',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Email Address
          </label>
          <Input type="email" placeholder="recipient@example.com" fullWidth />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Send</Button>
        </div>
      </div>
    ),
  },
};
