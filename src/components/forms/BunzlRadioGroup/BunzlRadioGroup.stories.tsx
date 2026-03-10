import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BunzlRadioGroup, BunzlRadioGroupItem } from './BunzlRadioGroup';

const meta: Meta<typeof BunzlRadioGroup> = {
  title: 'Forms/BunzlRadioGroup',
  component: BunzlRadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const RadioGroupDemo = (args: any) => {
  const [value, setValue] = useState(args.value || 'option1');
  return (
    <BunzlRadioGroup {...args} value={value} onChange={setValue}>
      <BunzlRadioGroupItem value="option1" label="Option 1" />
      <BunzlRadioGroupItem value="option2" label="Option 2" />
      <BunzlRadioGroupItem value="option3" label="Option 3" />
      <BunzlRadioGroupItem value="option4" label="Option 4" />
    </BunzlRadioGroup>
  );
};

export const Default: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    label: 'Select Option',
  },
};

export const Horizontal: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    label: 'Select Option',
    orientation: 'horizontal',
  },
};

export const WithDescriptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <BunzlRadioGroup {...args} value={value} onChange={setValue}>
        <BunzlRadioGroupItem
          value="option1"
          label="Option 1"
          description="Description for option 1"
        />
        <BunzlRadioGroupItem
          value="option2"
          label="Option 2"
          description="Description for option 2"
        />
      </BunzlRadioGroup>
    );
  },
  args: {
    label: 'Select Option',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <BunzlRadioGroup label="Small" size="sm" value="a">
        <BunzlRadioGroupItem value="a" label="Option A" />
        <BunzlRadioGroupItem value="b" label="Option B" />
      </BunzlRadioGroup>
      <BunzlRadioGroup label="Medium" size="md" value="a">
        <BunzlRadioGroupItem value="a" label="Option A" />
        <BunzlRadioGroupItem value="b" label="Option B" />
      </BunzlRadioGroup>
      <BunzlRadioGroup label="Large" size="lg" value="a">
        <BunzlRadioGroupItem value="a" label="Option A" />
        <BunzlRadioGroupItem value="b" label="Option B" />
      </BunzlRadioGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <BunzlRadioGroup {...args} value="option1" disabled>
      <BunzlRadioGroupItem value="option1" label="Option 1" />
      <BunzlRadioGroupItem value="option2" label="Option 2" />
    </BunzlRadioGroup>
  ),
  args: {
    label: 'Select Option (Disabled)',
  },
};

export const ThreeOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('medium');
    return (
      <BunzlRadioGroup {...args} value={value} onChange={setValue} orientation="horizontal">
        <BunzlRadioGroupItem value="small" label="Small" />
        <BunzlRadioGroupItem value="medium" label="Medium" />
        <BunzlRadioGroupItem value="large" label="Large" />
      </BunzlRadioGroup>
    );
  },
  args: {
    label: 'Size',
  },
};
