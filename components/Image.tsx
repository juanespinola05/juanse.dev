import { FunctionalComponent, JSX } from 'preact'

const Image: FunctionalComponent<JSX.HTMLAttributes<HTMLImageElement>> = (
  { src, ...props },
) => {
  const imageURL = src
  const source = `https://res.cloudinary.com/${
    Deno.env.get('CLOUDINARY_CLOUDNAME')
  }/image/fetch/c_fill,f_auto/${imageURL}`
  return (
    <img
      {...props}
      src={source}
      alt=''
    />
  )
}

export default Image
