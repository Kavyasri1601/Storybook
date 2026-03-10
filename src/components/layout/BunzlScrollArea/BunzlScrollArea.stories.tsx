import type { Meta, StoryObj } from '@storybook/react';
import { BunzlScrollArea } from './BunzlScrollArea';

const meta: Meta<typeof BunzlScrollArea> = {
  title: 'Layout/BunzlScrollArea',
  component: BunzlScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export const Default: Story = {
  args: {
    maxHeight: 300,
    className: 'w-[300px] rounded-md border border-secondary-200 dark:border-secondary-700',
    children: (
      <div className="p-4">
        {sampleItems.map((item) => (
          <div
            key={item}
            className="py-2 border-b border-secondary-100 dark:border-secondary-800 last:border-0"
          >
            {item}
          </div>
        ))}
      </div>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    maxWidth: 400,
    orientation: 'horizontal',
    className: 'rounded-md border border-secondary-200 dark:border-secondary-700',
    children: (
      <div className="flex p-4 space-x-4">
        {sampleItems.slice(0, 20).map((item) => (
          <div
            key={item}
            className="flex-shrink-0 w-32 h-24 bg-secondary-100 dark:bg-secondary-800 rounded-md flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </div>
    ),
  },
};

export const Both: Story = {
  args: {
    maxHeight: 300,
    maxWidth: 400,
    orientation: 'both',
    className: 'rounded-md border border-secondary-200 dark:border-secondary-700',
    children: (
      <div className="p-4" style={{ width: '800px' }}>
        {sampleItems.map((item) => (
          <div
            key={item}
            className="py-2 border-b border-secondary-100 dark:border-secondary-800 last:border-0 whitespace-nowrap"
          >
            {item} - This is a very long text that will cause horizontal scrolling when the container is smaller than the content
          </div>
        ))}
      </div>
    ),
  },
};

export const HiddenScrollbar: Story = {
  args: {
    maxHeight: 200,
    hideScrollbar: true,
    className: 'w-[300px] rounded-md border border-secondary-200 dark:border-secondary-700',
    children: (
      <div className="p-4">
        {sampleItems.slice(0, 20).map((item) => (
          <div
            key={item}
            className="py-2 border-b border-secondary-100 dark:border-secondary-800 last:border-0"
          >
            {item}
          </div>
        ))}
      </div>
    ),
  },
};

export const DataTable: Story = {
  args: {
    maxHeight: 400,
    className: 'w-full rounded-md border border-secondary-200 dark:border-secondary-700',
    children: (
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-secondary-50 dark:bg-secondary-800">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Product</th>
            <th className="px-4 py-3 text-left font-medium">SKU</th>
            <th className="px-4 py-3 text-left font-medium">Price</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleItems.map((item, i) => (
            <tr key={item} className="border-t border-secondary-100 dark:border-secondary-800">
              <td className="px-4 py-3">{item}</td>
              <td className="px-4 py-3">SKU-{String(i + 1).padStart(4, '0')}</td>
              <td className="px-4 py-3">$00.00</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success-dark">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
