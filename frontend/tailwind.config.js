/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: 'Roboto, monospace',
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

        tech: 'var(--color-tech)',
        'tech-lighter': 'var(--color-tech-lighter)',
        'tech-content': 'var(--color-tech-content)',
        cybersec: 'var(--color-cybersec)',
        'cybersec-lighter': 'var(--color-cybersec-lighter)',
        'cybersec-content': 'var(--color-cybersec-content)',
        gaming: 'var(--color-gaming)',
        'gaming-lighter': 'var(--color-gaming-lighter)',
        'gaming-content': 'var(--color-gaming-content)',

        'genre-action': 'var(--color-genre-action)',
        'genre-action-content': 'var(--color-genre-action-content)',
        'genre-crime': 'var(--color-genre-crime)',
        'genre-crime-content': 'var(--color-genre-crime-content)',
        'genre-horror': 'var(--color-genre-horror)',
        'genre-horror-content': 'var(--color-genre-horror-content)',
        'genre-thriller': 'var(--color-genre-thriller)',
        'genre-thriller-content': 'var(--color-genre-thriller-content)',
        'genre-comedy': 'var(--color-genre-comedy)',
        'genre-comedy-content': 'var(--color-genre-comedy-content)',
        'genre-family': 'var(--color-genre-family)',
        'genre-family-content': 'var(--color-genre-family-content)',
        'genre-drama': 'var(--color-genre-drama)',
        'genre-drama-content': 'var(--color-genre-drama-content)',
        'genre-animation': 'var(--color-genre-animation)',
        'genre-animation-content': 'var(--color-genre-animation-content)',
        'genre-adventure': 'var(--color-genre-adventure)',
        'genre-adventure-content': 'var(--color-genre-adventure-content)',
        'genre-scifi': 'var(--color-genre-scifi)',
        'genre-scifi-content': 'var(--color-genre-scifi-content)',
        'genre-fantasy': 'var(--color-genre-fantasy)',
        'genre-fantasy-content': 'var(--color-genre-fantasy-content)',
        'genre-romance': 'var(--color-genre-romance)',
        'genre-romance-content': 'var(--color-genre-romance-content)',

        success: 'var(--color-success)',
        'success-content': 'var(--color-success-content)',
        warning: 'var(--color-warning)',
        'warning-content': 'var(--color-warning-content)',
        error: 'var(--color-error)',
        'error-content': 'var(--color-error-content)',
      },
      fontSize: {
        xxs: '0.6rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Safari and Chrome */,
          },
        },
        '.no-select': {
          '-webkit-user-select': 'none' /* Safari */,
          '-moz-user-select': 'none' /* Firefox */,
          '-ms-user-select': 'none' /* IE10+/Edge */,
          'user-select': 'none' /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
        },
        '.no-pointer-events': {
          'pointer-events': 'none',
        },
        '.pointer-events-auto': {
          'pointer-events': 'auto',
        },
      });
    },
  ],
};
