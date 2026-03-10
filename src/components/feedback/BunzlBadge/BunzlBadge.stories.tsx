import type { Meta, StoryObj } from '@storybook/react';
import { BunzlBadge } from './BunzlBadge';

const meta: Meta<typeof BunzlBadge> = {
  title: 'Feedback/BunzlBadge',
  component: BunzlBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BunzlBadge variant="default">Default</BunzlBadge>
      <BunzlBadge variant="secondary">Secondary</BunzlBadge>
      <BunzlBadge variant="outline">Outline</BunzlBadge>
      <BunzlBadge variant="success">Success</BunzlBadge>
      <BunzlBadge variant="warning">Warning</BunzlBadge>
      <BunzlBadge variant="error">Error</BunzlBadge>
      <BunzlBadge variant="info">Info</BunzlBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <BunzlBadge size="sm">Small</BunzlBadge>
      <BunzlBadge size="md">Medium</BunzlBadge>
      <BunzlBadge size="lg">Large</BunzlBadge>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    onRemove: () => alert('Removed!'),
  },
};

export const Dot: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <BunzlBadge dot variant="default" />
      <BunzlBadge dot variant="success" />
      <BunzlBadge dot variant="warning" />
      <BunzlBadge dot variant="error" />
    </div>
  ),
};

export const FieldCount: Story = {
  args: {
    children: '6 fields selected',
    variant: 'secondary',
    size: 'sm',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BunzlBadge variant="success">Active</BunzlBadge>
      <BunzlBadge variant="warning">Pending</BunzlBadge>
      <BunzlBadge variant="error">Inactive</BunzlBadge>
      <BunzlBadge variant="info">Processing</BunzlBadge>
    </div>
  ),
};
