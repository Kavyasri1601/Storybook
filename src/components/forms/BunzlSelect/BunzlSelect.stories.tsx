import type { Meta, StoryObj } from '@storybook/react';
import { BunzlSelect } from './BunzlSelect';

const meta: Meta<typeof BunzlSelect> = {
  title: 'Forms/BunzlSelect',
  component: BunzlSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'barcode1', label: 'Barcode 1' },
  { value: 'barcode2', label: 'Barcode 2' },
  { value: 'barcode3', label: 'Barcode 3' },
  { value: 'barcode4', label: 'Barcode 4' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select option',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'barcode1',
  },
};

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Option',
    placeholder: 'Select option',
  },
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    size: 'sm',
    placeholder: 'Small select',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    size: 'lg',
    placeholder: 'Large select',
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    hasError: true,
    placeholder: 'Select an option',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Disabled select',
  },
};

export const FullWidth: Story = {
  args: {
    options: sampleOptions,
    fullWidth: true,
    placeholder: 'Full width select',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
