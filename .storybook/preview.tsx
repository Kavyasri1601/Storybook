import React from 'react';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
        { name: 'gray', value: '#f1f5f9' },
      ],
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light },
      current: 'light',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
    },
    layout: 'centered',
    docs: {
      theme: themes.light,
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark';
      return (
        <div className={isDark ? 'dark' : ''}>
          <div className="bg-white dark:bg-secondary-900 p-4 min-h-[100px]">
            <Story />
          </div>
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
