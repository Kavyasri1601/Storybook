import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component for grouping related content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card visual variant',
      table: {
        defaultValue: { summary: 'elevated' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    clickable: {
      control: 'boolean',
      description: 'Show pointer cursor',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. You can put any content here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
          <Button size="sm" variant="outline">Cancel</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <CardContent>Elevated card with shadow</CardContent>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <CardContent>Outlined card with border</CardContent>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <CardContent>Filled card with background</CardContent>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card variant="elevated">
        <CardContent>Elevated</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Outlined</CardContent>
      </Card>
      <Card variant="filled">
        <CardContent>Filled</CardContent>
      </Card>
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="none">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-4">No padding</div>
      </Card>
      <Card padding="sm">
        <CardContent>Small padding</CardContent>
      </Card>
      <Card padding="md">
        <CardContent>Medium padding</CardContent>
      </Card>
      <Card padding="lg">
        <CardContent>Large padding</CardContent>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <CardContent>Hover over me to see the shadow effect</CardContent>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    hoverable: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <CardContent>Click me!</CardContent>
    ),
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card padding="none" hoverable>
      <div className="aspect-video bg-secondary-200 dark:bg-secondary-700 rounded-t-lg" />
      <div className="p-4">
        <CardTitle>Product Name</CardTitle>
        <CardDescription>Short product description</CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-secondary-900 dark:text-white">$99.00</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-secondary-200 dark:bg-secondary-700" />
      <CardHeader className="mt-4 mb-0">
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer</CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-sm">
          Building amazing products with React and TypeScript.
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button size="sm" variant="outline">Follow</Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardDescription>Total Users</CardDescription>
        <p className="text-3xl font-bold text-secondary-900 dark:text-white mt-1">12,345</p>
        <p className="text-sm text-success mt-2">+12% from last month</p>
      </Card>
      <Card>
        <CardDescription>Revenue</CardDescription>
        <p className="text-3xl font-bold text-secondary-900 dark:text-white mt-1">$45,678</p>
        <p className="text-sm text-success mt-2">+8% from last month</p>
      </Card>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};
