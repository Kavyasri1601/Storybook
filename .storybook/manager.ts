import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'E-Commerce UI',
  brandUrl: '/',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#2563eb',
  colorSecondary: '#3b82f6',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // Text colors
  textColor: '#0f172a',
  textInverseColor: '#ffffff',

  // Toolbar
  barTextColor: '#64748b',
  barSelectedColor: '#2563eb',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#0f172a',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
