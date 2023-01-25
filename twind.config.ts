import { Options } from '$fresh/plugins/twind.ts';
import { css } from 'twind/css';
import { apply, tw } from 'twind';

/** @type {Omit<import("$fresh/plugins/twind.ts").Options, "selfURL">} */
export default {
  preflight: {
    body: apply`
      ${
      css({
        '&': {
          backgroundColor: '#010137',
        },
        '&::before, &::after': {
          position: 'fixed',
          width: '300px',
          height: '300px',
          filter: 'blur(100px)',
          zIndex: '-1',
          content: '""',
        },
        '&::before': {
          backgroundColor: '#370848',
          top: '50px',
          left: '30px',
        },
        '&::after': {
          backgroundColor: '#1C0356',
          bottom: '50px',
          right: '30px',
        },
      })
    }`,
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
