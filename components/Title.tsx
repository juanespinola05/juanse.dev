import { FunctionalComponent } from 'preact'

const titleVariants = {
  'lg': 'lg',
  '3xl': '3xl',
  '5xl': '5xl',
}

interface TitleComponentProps {
  size: keyof typeof titleVariants
}

const Title: FunctionalComponent<TitleComponentProps> = (
  { children, size },
) => {
  const selectedSize = 'text-' + titleVariants[size]

  return (
    <h2 class={`${selectedSize} font-bold`}>
      {children}
    </h2>
  )
}

export default Title
