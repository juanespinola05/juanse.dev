import { Options } from '$fresh/plugins/twind.ts'
import { css } from 'twind/css'
import { apply } from 'twind'

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
        '&.noscroll': {
          maxHeight: '100vh',
          overflow: 'hidden',
        },
      })
    }`,
  },
  theme: {
    extend: {
      colors: {
        darkBlue: '#010137',
        pink: '#E71E7C',
        moonstone: '#6db1bfff',
        trueblue: '#4062bbff',
        mimipink: '#f2cee6ff',
        base: 'hsl(220 17.647% 20%)',
      },
      fontFamily: {
        'oswald': ['Oswald', 'Helvetica', 'sans-serif'],
        'default': [
          'Source Sans Pro',
          'sans-serif',
        ],
      },
    },
  },
} as Omit<Options, 'selfURL'>
