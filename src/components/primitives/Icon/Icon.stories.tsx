import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Settings,
  User,
  Mail,
  Bell,
  Search,
  Heart,
  Star,
  Check,
  X,
  AlertCircle,
  Info,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Icon } from './Icon';
import BunzlLogoSvg from '../../../assets/bunzl-logo.svg';

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon wrapper component for Lucide icons with consistent sizing and colors.',
      },
    },
  },
  argTypes: {
    icon: {
      control: false,
      description: 'Lucide icon component',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'error', 'success', 'warning', 'inherit'],
      description: 'Icon color',
      table: {
        defaultValue: { summary: 'inherit' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
  args: {
    icon: Home,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Home} size="xs" />
      <Icon icon={Home} size="sm" />
      <Icon icon={Home} size="md" />
      <Icon icon={Home} size="lg" />
      <Icon icon={Home} size="xl" />
    </div>
  ),
};

export const ExtraSmall: Story = {
  args: {
    icon: Home,
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    icon: Home,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    icon: Home,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    icon: Home,
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: Home,
    size: 'xl',
  },
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Heart} color="default" />
      <Icon icon={Heart} color="muted" />
      <Icon icon={Heart} color="primary" />
      <Icon icon={Heart} color="error" />
      <Icon icon={Heart} color="success" />
      <Icon icon={Heart} color="warning" />
    </div>
  ),
};

export const DefaultColor: Story = {
  args: {
    icon: Heart,
    color: 'default',
    size: 'lg',
  },
};

export const PrimaryColor: Story = {
  args: {
    icon: Heart,
    color: 'primary',
    size: 'lg',
  },
};

export const ErrorColor: Story = {
  args: {
    icon: AlertCircle,
    color: 'error',
    size: 'lg',
  },
};

export const SuccessColor: Story = {
  args: {
    icon: Check,
    color: 'success',
    size: 'lg',
  },
};

// With Label (Accessible)
export const WithLabel: Story = {
  args: {
    icon: Mail,
    label: 'Email inbox',
    size: 'lg',
  },
};

// Common Icons Showcase
export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Home} size="lg" />
        <span className="text-xs text-secondary-500">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Settings} size="lg" />
        <span className="text-xs text-secondary-500">Settings</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={User} size="lg" />
        <span className="text-xs text-secondary-500">User</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Mail} size="lg" />
        <span className="text-xs text-secondary-500">Mail</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Bell} size="lg" />
        <span className="text-xs text-secondary-500">Bell</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" />
        <span className="text-xs text-secondary-500">Search</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="lg" />
        <span className="text-xs text-secondary-500">Heart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="lg" />
        <span className="text-xs text-secondary-500">Star</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Check} size="lg" color="success" />
        <span className="text-xs text-secondary-500">Check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={X} size="lg" color="error" />
        <span className="text-xs text-secondary-500">X</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={AlertCircle} size="lg" color="warning" />
        <span className="text-xs text-secondary-500">Alert</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Info} size="lg" color="primary" />
        <span className="text-xs text-secondary-500">Info</span>
      </div>
    </div>
  ),
};

// Navigation Icons
export const NavigationIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={ChevronRight} />
      <Icon icon={ArrowRight} />
    </div>
  ),
};

// Inline with Text
export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
      <Icon icon={Mail} size="sm" color="inherit" />
      <span>contact@example.com</span>
    </div>
  ),
};

// Bunzl Logo
export const BunzlLogo: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <img src={BunzlLogoSvg} alt="Bunzl Logo" style={{ width: '62px', height: '60px' }} />
      <span className="text-sm text-secondary-500">Bunzl Logo (62×60)</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bunzl company logo used in login page headers. Dimensions: 62×60 pixels.',
      },
    },
  },
};
