import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading spinner component with multiple sizes and colors.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'current'],
      description: 'Spinner color',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <div className="bg-secondary-900 p-2 rounded">
        <Spinner color="white" />
      </div>
    </div>
  ),
};

export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    size: 'lg',
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    size: 'lg',
  },
};

export const WhiteColor: Story = {
  args: {
    color: 'white',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="bg-secondary-900 p-4 rounded">
        <Story />
      </div>
    ),
  ],
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Submitting form...',
    size: 'lg',
  },
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Spinner size="sm" color="current" />
        <span className="ml-2">Loading...</span>
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" color="current" />
        <span className="ml-2">Processing...</span>
      </Button>
    </div>
  ),
};

export const CenteredInContainer: Story = {
  render: () => (
    <div className="flex items-center justify-center h-40 w-64 border border-secondary-200 dark:border-secondary-700 rounded">
      <Spinner size="lg" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      <span className="text-secondary-600 dark:text-secondary-400">Loading...</span>
    </div>
  ),
};
