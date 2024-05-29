/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-content': 'var(--color-primary-content)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',

        secondary: 'var(--color-secondary)',
        'secondary-content': 'var(--color-secondary-content)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'secondary-light': 'var(--color-secondary-light)',

        'bg-dark': 'var(--color-bg-dark)',
        'content-dark': 'var(--color-content-dark)',
        'border-dark': 'var(--color-border-dark)',

        'bg-light': 'var(--color-bg-light)',
        'content-light': 'var(--color-content-light)',
        'border-light': 'var(--color-border-light)',

        success: 'var(--color-success)',
        'success-content': 'var(--color-success-content)',
        warning: 'var(--color-warning)',
        'warning-content': 'var(--color-warning-content)',
        error: 'var(--color-error)',
        'error-content': 'var(--color-error-content)',
      },
    },
  },
  plugins: [],
};
