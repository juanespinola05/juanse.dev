import { Options } from '$fresh/plugins/twind.ts';
import { css } from 'twind/css';
import { apply } from 'twind';

/** @type {Omit<import("$fresh/plugins/twind.ts").Options, "selfURL">} */
export default {
  preflight: {
    body: apply`
      ${
      css({
        backgroundImage: 'url("/bg.png")',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100%',
        backgroundColor: '#010137',
      })
    }
    `,
  },
  theme: {
    extend: {
      colors: {
        darkBlue: '#010137',
        pink: '#E71E7C',
      },
      fontFamily: {
        'oswald': ['Oswald', 'Helvetica', 'sans-serif'],
        'default': [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
} as Omit<Options, 'selfURL'>;
