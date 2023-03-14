const aspectRatio = {
  aspectSquare: { 'aspect-ratio': '1/1' },
  aspectVideo: { 'aspect-ratio': '16/9' },
}

export const projectsGrid = {
  display: 'grid',
  placeItems: 'stretch',
  gap: '20px',
  '@media (min-width: 0px)': {
    gridTemplateColumns: '100%',
    gridAutoRows: '400px',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridAutoRows: '100px',
    '& a:first-child, & a:last-child': {
      gridColumn: 'span 2',
      gridRow: 'span 2',
    },
    '& a:not(:first-child, :last-child)': {
      gridRow: 'span 3',
    },
  },
}

export const decorationTransparent = {
  textDecorationColor: 'transparent',
}

export const { aspectSquare, aspectVideo } = aspectRatio
