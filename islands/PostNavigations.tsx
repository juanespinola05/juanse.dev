import { css } from 'twind/css'
import { tw } from 'twind'
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'

type SectionsType = Element[]

const sizes: Record<string, string> = {
  H2: 'text-xl',
  H3: 'text-lg ml-2',
  H4: 'text-sm ml-4',
}

const PostNavigation = () => {
  const [sections, setSections] = useState<SectionsType>([])
  const [show, setShow] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => {
      if (self.innerWidth >= 1400) setMobile(false)
      else {
        setMobile(true)
        setShow(false)
      }
    }
    handleWindowResize()

    self.addEventListener('resize', handleWindowResize)

    return () => {
      self.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useLayoutEffect(() => {
    const anchors = self.document.querySelectorAll(
      'article h2, article h3, article h4',
    )
    setSections(Array.from(anchors))
  }, [])

  const handleNavigation = () => {
    if (mobile) setShow(!show)
  }

  const navStyles = tw(css({
    '&': {
      '@apply':
        'fixed rounded-xl rounded-tl-none transition-all xl:max-h-full max-h-[500px] top-52 z-10',
      right: mobile && show ? '20px' : (mobile ? '-310px' : '0px'),
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
      <div class='font-default p-2 max-w-[310px] xl:max-h-full max-h-[500px] overflow-y-scroll text-lg'>
        <p class='font-bold mb-2'>Contenido</p>
        <ul class='list-inside flex flex-col gap-1'>
          {sections.map((section) => (
            <li key={section.id} class='text-gray-400 hover:text-white'>
              <a
                href={`#${section.id}`}
                onClick={handleNavigation}
                class={`block ${sizes[section.tagName]}`}
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
