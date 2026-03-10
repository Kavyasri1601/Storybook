import type { Meta, StoryObj } from '@storybook/react';
import { BunzlProgress } from './BunzlProgress';

const meta: Meta<typeof BunzlProgress> = {
  title: 'Feedback/BunzlProgress',
  component: BunzlProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Generating PDF...',
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <BunzlProgress value={60} size="xs" />
      <BunzlProgress value={60} size="sm" />
      <BunzlProgress value={60} size="md" />
      <BunzlProgress value={60} size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <BunzlProgress value={60} color="primary" label="Primary" />
      <BunzlProgress value={60} color="secondary" label="Secondary" />
      <BunzlProgress value={60} color="success" label="Success" />
      <BunzlProgress value={60} color="warning" label="Warning" />
      <BunzlProgress value={60} color="error" label="Error" />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    indeterminate: true,
    label: 'Loading...',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Complete',
    showValue: true,
    color: 'success',
  },
};

export const PDFGeneration: Story = {
  args: {
    value: 45,
    label: 'Generating labels...',
    showValue: true,
    size: 'sm',
  },
};
