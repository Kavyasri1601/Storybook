import type { Meta, StoryObj } from '@storybook/react';
import { Sun, Moon, LogOut, User, Settings, HelpCircle } from 'lucide-react';
import {
  BunzlDropdownMenu,
  BunzlDropdownMenuTrigger,
  BunzlDropdownMenuContent,
  BunzlDropdownMenuItem,
  BunzlDropdownMenuSeparator,
  BunzlDropdownMenuLabel,
} from './BunzlDropdownMenu';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof BunzlDropdownMenu> = {
  title: 'Overlay/BunzlDropdownMenu',
  component: BunzlDropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BunzlDropdownMenu>
      <BunzlDropdownMenuTrigger>
        <Button variant="outline">Open Menu</Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent>
        <BunzlDropdownMenuItem>Profile</BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>Settings</BunzlDropdownMenuItem>
        <BunzlDropdownMenuSeparator />
        <BunzlDropdownMenuItem>Logout</BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <BunzlDropdownMenu>
      <BunzlDropdownMenuTrigger>
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Account
        </Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent>
        <BunzlDropdownMenuItem icon={<User className="h-4 w-4" />}>
          Profile
        </BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem icon={<Settings className="h-4 w-4" />}>
          Settings
        </BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem icon={<HelpCircle className="h-4 w-4" />}>
          Help
        </BunzlDropdownMenuItem>
        <BunzlDropdownMenuSeparator />
        <BunzlDropdownMenuItem icon={<LogOut className="h-4 w-4" />} destructive>
          Sign Out
        </BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};

export const ThemeToggle: Story = {
  render: () => (
    <BunzlDropdownMenu>
      <BunzlDropdownMenuTrigger>
        <Button variant="ghost" size="sm">
          <Sun className="h-5 w-5" />
        </Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent>
        <BunzlDropdownMenuItem icon={<Sun className="h-4 w-4" />}>
          Light
        </BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem icon={<Moon className="h-4 w-4" />}>
          Dark
        </BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>System</BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <BunzlDropdownMenu>
      <BunzlDropdownMenuTrigger>
        <Button variant="outline">Options</Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent width={200}>
        <BunzlDropdownMenuLabel>My Account</BunzlDropdownMenuLabel>
        <BunzlDropdownMenuItem>Profile</BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>Billing</BunzlDropdownMenuItem>
        <BunzlDropdownMenuSeparator />
        <BunzlDropdownMenuLabel>Team</BunzlDropdownMenuLabel>
        <BunzlDropdownMenuItem>Settings</BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>Invite members</BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <BunzlDropdownMenu>
      <BunzlDropdownMenuTrigger>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-2" />
          admin@example.com
        </Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent width={220}>
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-secondary-900 dark:text-white">
            admin@example.com
          </p>
          <p className="text-xs text-secondary-500 dark:text-secondary-400">Administrator</p>
        </div>
        <BunzlDropdownMenuSeparator />
        <BunzlDropdownMenuItem icon={<LogOut className="h-4 w-4" />} destructive>
          Sign Out
        </BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <BunzlDropdownMenu align="start">
      <BunzlDropdownMenuTrigger>
        <Button variant="outline">Align Start</Button>
      </BunzlDropdownMenuTrigger>
      <BunzlDropdownMenuContent>
        <BunzlDropdownMenuItem>Option 1</BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>Option 2</BunzlDropdownMenuItem>
        <BunzlDropdownMenuItem>Option 3</BunzlDropdownMenuItem>
      </BunzlDropdownMenuContent>
    </BunzlDropdownMenu>
  ),
};
