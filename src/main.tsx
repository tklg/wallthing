import { ModuleConfigProvider } from '@/providers/ModuleConfigProvider';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './samples/node-api'

// https://nextui.org/docs/theme/customize-theme
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      textLight: '$accents8',

      gradient: 'linear-gradient(60deg, $blue100 0%, $cyan400 30%, $green600 100%)',
      link: '#5E1DAD',
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider theme={darkTheme}>
      <ModuleConfigProvider>
        <App />
      </ModuleConfigProvider>
    </NextUIProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
