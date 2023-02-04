import { css } from 'twind/css'
import { tw } from 'twind'
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'

type SectionsType = Element[]

const PostNavigation = () => {
  const [sections, setSections] = useState<SectionsType>([])
  const [show, setShow] = useState(false)
  const [mobile, setMobile] = useState(true)

  useEffect(() => {
    const handleWindowResize = () => {
      if (self.innerWidth >= 1260) setMobile(false)
      else {
        setMobile(true)
        setShow(false)
      }
    }

    self.addEventListener('resize', handleWindowResize)

    return () => {
      self.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useLayoutEffect(() => {
    const anchors = self.document.querySelectorAll('article h4')
    setSections(Array.from(anchors))
  }, [])

  const handleNavigation = () => {
    if (mobile) setShow(!show)
  }

  const navStyles = tw(css({
    '&': {
      '@apply':
        'fixed rounded-xl rounded-tl-none transition-all max-h-[400px] top-52 z-10',
      right: mobile && show ? '20px' : (mobile ? '-200px' : '20px'),
      backgroundColor: mobile ? 'rgb(55,65,81)' : 'transparent',
    },
  }))

  return (
    <div
      class={navStyles}
    >
      <div class={`relative ${mobile ? 'block' : 'hidden'}`}>
        <button
          onClick={handleNavigation}
          class='absolute p-3 bg-gray-700 rounded-bl-md rounded-tl-md left-[-28px] outline-none focus:outline-none'
        >
          |
        </button>
      </div>
      <div class='font-default p-2 max-w-[200px] max-h-[400px] overflow-y-scroll text-xs'>
        <p class='text-sm font-bold mb-2'>Contenido</p>
        <ul class='list-inside flex flex-col gap-1'>
          {sections.map((section) => (
            <li key={section.id} class='text-gray-400 hover:text-white'>
              <a
                href={`#${section.id}`}
                onClick={handleNavigation}
                class='block'
              >
                <span class='text-white'>- &nbsp;</span>
                {section.textContent}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostNavigation
