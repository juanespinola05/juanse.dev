import { FunctionalComponent, JSX } from 'preact'

export const Logo: FunctionalComponent<JSX.HTMLAttributes<HTMLImageElement>> = (
  props,
) => {
  return (
    <img
      {...props}
      src='/logo.png'
      alt='Juanse Logo'
    />
  )
}
