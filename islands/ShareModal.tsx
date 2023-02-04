import { useEffect, useState } from 'preact/hooks'
import { FunctionalComponent, JSX } from 'preact'
import SocialMediaShareList from '../components/SocialMediaShareList.tsx'
import CopyButton from './CopyButton.tsx'
import IconShare from 'tabler-icon/share.tsx'
import IconLink from 'tabler-icon/link.tsx'
import IconX from 'tabler-icon/x.tsx'
import { ShareOptions } from '../types.d.ts'

const ShareModal: FunctionalComponent<ShareOptions> = (
  { url, text, title },
) => {
  const [showModal, setShowModal] = useState(false)
  const handleClick: JSX.MouseEventHandler<HTMLButtonElement> = () => {
    if ('share' in navigator) {
      navigator.share({ url, text, title })
    } else {
      setShowModal(true)
    }
  }

  useEffect(() => {
    if (showModal) document.body.classList.add('noscroll')
    else document.body.classList.remove('noscroll')
  }, [showModal])

  return (
    <>
      <button
        onClick={handleClick}
        class='cursor-pointer bg-white text-[#1D9BF0] rounded-xl shadow-xl bottom(5 sm:10) right(3 sm:10) p-3 fixed flex gap-2 z-10'
      >
        <IconShare />
      </button>
      <div
        class={`${showModal ? 'grid' : 'hidden'}
        fixed w-screen h-screen top-0 left-0 z-50 font-default text-black grid place-content-center bg-black bg-opacity-30`}
      >
        <div
          class={`w-full max-w-md h-80 p-6 rounded-xl bg-white shadow-lg`}
        >
          <header class='border-b-1 border-gray-300 flex justify-between'>
            <p class='text-2xl font-bold mb-3'>Compartir</p>
            <button
              onClick={() => setShowModal(false)}
              class='rounded-full w-8 h-8 grid place-content-center border-1 border-gray-300'
            >
              <IconX size={20} />
            </button>
          </header>
          <div>
            <div class='py-3'>
              <p>Compartir este link a través de:</p>
            </div>
            <SocialMediaShareList url={url} text={text} />

            <div class='py-3'>
              <p>O copiá el link:</p>
            </div>
            <div class='rounded-xl border-1 border-gray-300 px-2 flex justify-between items-center'>
              <IconLink />
              <input
                class='px-1 py-3 text-gray-600 text-lg focus:outline-none'
                type='text'
                value={url}
                readOnly
              />
              <div class='px-3 py-2 text-center bg-pink min-w-[75px] rounded-xl my-2 text-white'>
                <CopyButton text={url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareModal
