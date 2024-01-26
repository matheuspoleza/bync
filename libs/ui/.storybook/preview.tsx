import '../src/global.css';
import '../src/vendors';
import '../src/theme.css';
import './assets/fonts/fonts.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { DismissableLayersGlobalProvider } from 'react-dismissable-layers';

import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
        fontFamily: 'sans-serif',
      },
    },
  },


  decorators: [
    (Story) => (
      <DismissableLayersGlobalProvider>
        <Story />
      </DismissableLayersGlobalProvider>
    ),
  ],
};

export default preview;
