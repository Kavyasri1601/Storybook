import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, User, Search } from 'lucide-react';
import { Navbar, NavbarLink, NavbarBrand } from './Navbar';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Basic navigation bar component for page headers.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'transparent', 'bordered'],
      description: 'Visual variant',
      table: {
        defaultValue: { summary: 'bordered' },
      },
    },
    sticky: {
      control: 'boolean',
      description: 'Sticky positioning',
    },
    containerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Container width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logo: <NavbarBrand>E-Commerce</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">Products</NavbarLink>
        <NavbarLink href="#">Categories</NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
      </>
    ),
    actions: (
      <>
        <Button variant="ghost" size="sm">Sign In</Button>
        <Button size="sm">Sign Up</Button>
      </>
    ),
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    logo: <NavbarBrand>Brand</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </>
    ),
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    logo: <NavbarBrand>Brand</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">Features</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    logo: <NavbarBrand>Brand</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">Products</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </>
    ),
  },
};

export const EcommerceNavbar: Story = {
  args: {
    logo: <NavbarBrand>ShopName</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#">New Arrivals</NavbarLink>
        <NavbarLink href="#">Women</NavbarLink>
        <NavbarLink href="#">Men</NavbarLink>
        <NavbarLink href="#">Sale</NavbarLink>
      </>
    ),
    actions: (
      <>
        <button className="p-2 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300">
          <Search size={20} />
        </button>
        <button className="p-2 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300">
          <User size={20} />
        </button>
        <button className="p-2 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
      </>
    ),
  },
};

export const WithSearchBar: Story = {
  render: () => (
    <Navbar
      logo={<NavbarBrand>Brand</NavbarBrand>}
      actions={
        <Button size="sm" variant="outline">Sign In</Button>
      }
    >
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-secondary-50 dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </Navbar>
  ),
};

export const Sticky: Story = {
  args: {
    sticky: true,
    logo: <NavbarBrand>Sticky Nav</NavbarBrand>,
    navItems: (
      <>
        <NavbarLink href="#">Section 1</NavbarLink>
        <NavbarLink href="#">Section 2</NavbarLink>
        <NavbarLink href="#">Section 3</NavbarLink>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] overflow-auto">
        <Story />
        <div className="p-8 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="text-secondary-600 dark:text-secondary-400">
              Scroll down to see the sticky navbar in action. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
};

export const MinimalNavbar: Story = {
  args: {
    logo: <NavbarBrand>Logo</NavbarBrand>,
    actions: (
      <Button size="sm">Get Started</Button>
    ),
  },
};
