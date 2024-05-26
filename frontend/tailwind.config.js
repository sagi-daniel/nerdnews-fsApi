/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#cde435',
        'primary-content': '#141703',
        'primary-dark': '#b4cb1b',
        'primary-light': '#d8ea62',

        secondary: '#35e4a3',
        'secondary-content': '#031710',
        'secondary-dark': '#1bcb8a',
        'secondary-light': '#62eab7',

        background: '#f0f0f0',
        foreground: '#fbfbfb',
        border: '#dfdfdf',

        copy: '#262626',
        'copy-light': '#666666',
        'copy-lighter': '#8c8c8c',

        success: '#35e435',
        'success-content': '#031703',
        warning: '#e4e435',
        'warning-content': '#171703',
        error: '#e43535',
        'error-content': '#ffffff',
      },
    },
  },
};
