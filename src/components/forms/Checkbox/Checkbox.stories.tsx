import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Styled checkbox component with label and description support.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    hasError: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and updates.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Select item',
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-secondary-900 dark:text-white mb-2">
        Notification preferences
      </legend>
      <Checkbox
        label="Email notifications"
        description="Get notified via email"
        defaultChecked
      />
      <Checkbox
        label="SMS notifications"
        description="Get notified via SMS"
      />
      <Checkbox
        label="Push notifications"
        description="Get notified on your device"
        defaultChecked
      />
    </fieldset>
  ),
};

export const TermsAndConditions: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Checkbox label="I agree to the Terms of Service" required />
      <Checkbox label="I agree to the Privacy Policy" required />
      <Checkbox
        label="Subscribe to newsletter"
        description="Receive occasional updates about new features and promotions"
      />
    </div>
  ),
};

export const SelectAll: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox
        label="Select all"
        indeterminate
      />
      <div className="ml-6 space-y-2">
        <Checkbox label="Option 1" defaultChecked />
        <Checkbox label="Option 2" defaultChecked />
        <Checkbox label="Option 3" />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Email address
        </label>
        <input
          type="email"
          className="form-input-base w-full"
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Password
        </label>
        <input
          type="password"
          className="form-input-base w-full"
          placeholder="Enter password"
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" size="sm" />
        <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
          Forgot password?
        </a>
      </div>
    </div>
  ),
};
