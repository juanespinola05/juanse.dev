import { FunctionalComponent } from 'preact'
import { Post } from '../types/posts.d.ts'
import { Project } from '../types/projects.d.ts'
import { useState } from 'preact/hooks'
import IconBell from 'tabler-icon/bell.tsx'
import IconX from 'tabler-icon/x.tsx'

interface IProps {
  projects: Project[]
  posts: Post[]
}

const NotificactionModal: FunctionalComponent<IProps> = (
  { projects, posts },
) => {
  const [showNotifications, setShowNotifications] = useState(false)
  return (
    <>
      <button
        onClick={() => setShowNotifications((prev) => !prev)}
        class='fixed bottom(5 sm:10) right(3 sm:10) rounded-xl shadow-xl focus:outline-none active:outline-none bg-white p-3 border-none z-20'
      >
        <IconBell class='text-darkBlue' />
        <span class='absolute -right-1 -top-1 flex h-3 w-3'>
          <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-pink opacity-75'>
          </span>
          <span class='absolute z-10 inline-flex rounded-full h-3 w-3 bg-pink'>
          </span>
        </span>
      </button>
      <div
        class={`${
          showNotifications ? 'fixed' : 'hidden'
        } bottom(20 sm:24) right(3 sm:10) z-20 drop-shadow-xl pl-2`}
      >
        <div class='w-full min-w-[200px] max-w-md px-2 py-4 rounded-xl bg-white shadow-lg font-default text-black'>
          <header class='border-b-1 border-gray-300 flex justify-between items-center'>
            <p class='text-md mb-1 pl-2'>Qué hay nuevo</p>
          </header>
          <div>
            <ul class='py-3 pl-4 list-disc text-blue-500'>
              {posts.map((p) => (
                <li>
                  <a href={`/blog/${p.id}`}>
                    Blogpost: {p.title}
                  </a>
                </li>
              ))}
              {projects.map((p) => (
                <li>
                  <a href={`/projects/${p.id}`}>
                    Projecto: {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificactionModal
