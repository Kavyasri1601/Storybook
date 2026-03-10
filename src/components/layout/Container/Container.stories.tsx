import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Container component for consistent max-width and padding across pages.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
      table: {
        defaultValue: { summary: 'xl' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Center the container',
    },
    padded: {
      control: 'boolean',
      description: 'Add horizontal padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const ContentBox = () => (
  <div className="bg-primary-100 dark:bg-primary-900/30 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-8 text-center text-primary-700 dark:text-primary-300">
    Container Content
  </div>
);

export const Default: Story = {
  args: {
    children: <ContentBox />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: <ContentBox />,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: <ContentBox />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: <ContentBox />,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: <ContentBox />,
  },
};

export const TwoXL: Story = {
  args: {
    size: '2xl',
    children: <ContentBox />,
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    children: <ContentBox />,
  },
};

export const NotCentered: Story = {
  args: {
    size: 'md',
    centered: false,
    children: <ContentBox />,
  },
};

export const NoPadding: Story = {
  args: {
    padded: false,
    children: <ContentBox />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 py-8 bg-secondary-50 dark:bg-secondary-900">
      <Container size="sm">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow text-center">
          <span className="text-sm text-secondary-500">sm (640px)</span>
        </div>
      </Container>
      <Container size="md">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow text-center">
          <span className="text-sm text-secondary-500">md (768px)</span>
        </div>
      </Container>
      <Container size="lg">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow text-center">
          <span className="text-sm text-secondary-500">lg (1024px)</span>
        </div>
      </Container>
      <Container size="xl">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow text-center">
          <span className="text-sm text-secondary-500">xl (1280px)</span>
        </div>
      </Container>
      <Container size="2xl">
        <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow text-center">
          <span className="text-sm text-secondary-500">2xl (1536px)</span>
        </div>
      </Container>
    </div>
  ),
};

export const PageLayout: Story = {
  render: () => (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
      <Container>
        <div className="space-y-6">
          <header className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
              Page Title
            </h1>
            <p className="text-secondary-500 dark:text-secondary-400 mt-1">
              This is an example page layout using the Container component.
            </p>
          </header>
          <main className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Main Content
            </h2>
            <p className="text-secondary-600 dark:text-secondary-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </main>
        </div>
      </Container>
    </div>
  ),
};
