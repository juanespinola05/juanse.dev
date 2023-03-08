import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index'
import { PostsPagination } from '../utils/post.ts'

interface PageKeyPadProps extends Omit<PostsPagination, 'posts'> {}

const PageKeypad: FunctionalComponent<PageKeyPadProps> = (
  { currentPage, totalPages },
) => {
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div class='h-16 mb-12 flex justify-center items-center gap-2 flex-wrap'>
      {pageButtons.map((page) => {
        const isCurrent = currentPage === page
        const path = isCurrent ? '#' : `/blog?page=${page}`
        return (
          <a
            href={path}
            class={`block rounded-md px-3 py-2 bg-pink shadow-md ${
              isCurrent ? 'bg-transparent border-pink border-2' : ''
            }`}
          >
            {page}
          </a>
        )
      })}
    </div>
  )
}

export default PageKeypad
