import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Heading1, Heading2, Heading3, Text, Caption } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Primitives/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography component for consistent text styling across the application.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline'],
      description: 'Typography variant',
      table: {
        defaultValue: { summary: 'body1' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'error', 'success', 'warning'],
      description: 'Text color',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate with ellipsis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// Default
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

// Bunzl Page Title
export const BunzlPagetitle: Story = {
  args: {
    variant: 'display',
    children: 'Sign In',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bunzl Page Title (40px) for large page titles like login headers.',
      },
    },
  },
};

// Headings
export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="display">Display (40px)</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

// Body Text
export const BodyText: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Typography variant="body1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="body2">
        Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};

// Caption and Overline
export const SmallText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="caption">Caption text - small helper text</Typography>
      <Typography variant="overline">Overline text</Typography>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default color</Typography>
      <Typography color="muted">Muted color</Typography>
      <Typography color="primary">Primary color</Typography>
      <Typography color="error">Error color</Typography>
      <Typography color="success">Success color</Typography>
      <Typography color="warning">Warning color</Typography>
    </div>
  ),
};

// Weights
export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="normal">Normal weight</Typography>
      <Typography weight="medium">Medium weight</Typography>
      <Typography weight="semibold">Semibold weight</Typography>
      <Typography weight="bold">Bold weight</Typography>
    </div>
  ),
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <div className="space-y-2 w-full">
      <Typography align="left" className="border-b pb-2">
        Left aligned text
      </Typography>
      <Typography align="center" className="border-b pb-2">
        Center aligned text
      </Typography>
      <Typography align="right" className="border-b pb-2">
        Right aligned text
      </Typography>
    </div>
  ),
};

// Truncate
export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      'This is a very long text that will be truncated with an ellipsis when it exceeds the container width.',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

// Custom Element
export const CustomElement: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" as="span">
        H2 styled as span
      </Typography>
      <Typography variant="body1" as="div">
        Body text as div
      </Typography>
    </div>
  ),
};

// Convenience Components
export const ConvenienceComponents: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading1>Heading 1 Component</Heading1>
      <Heading2>Heading 2 Component</Heading2>
      <Heading3>Heading 3 Component</Heading3>
      <Text>Text Component - default body text</Text>
      <Caption color="muted">Caption Component - helper text</Caption>
    </div>
  ),
};

// Full Typography Scale
export const FullScale: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Typography variant="overline" color="muted">
          Typography Scale
        </Typography>
        <Typography variant="h1">Display & Headings</Typography>
      </div>

      <div className="space-y-3">
        <Typography variant="display">display. Sign In</Typography>
        <Typography variant="h1">h1. Heading</Typography>
        <Typography variant="h2">h2. Heading</Typography>
        <Typography variant="h3">h3. Heading</Typography>
        <Typography variant="h4">h4. Heading</Typography>
        <Typography variant="h5">h5. Heading</Typography>
        <Typography variant="h6">h6. Heading</Typography>
      </div>

      <div className="space-y-3 max-w-lg">
        <Typography variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit.
        </Typography>
        <Typography variant="body2">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit.
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="caption" as="div">
          caption. Smaller text for captions
        </Typography>
        <Typography variant="overline" as="div">
          Overline text
        </Typography>
      </div>
    </div>
  ),
};
