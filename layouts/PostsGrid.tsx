import { FunctionalComponent } from 'preact'

const PostsGrid: FunctionalComponent = ({ children }) => {
  return (
    <div class='grid grid-cols(1 md:2 lg:3) gap-6'>
      {children}
    </div>
  )
}

export default PostsGrid
