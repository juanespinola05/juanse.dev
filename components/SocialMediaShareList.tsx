import { FunctionalComponent } from 'preact'
import { ShareOptions, SocialMediaTypes } from '../types.d.ts'
import SocialMediaIcon from './SocialMediaIcon.tsx'

const SocialMediaShareList: FunctionalComponent<ShareOptions> = (
  { url, text },
) => {
  const socialMediaList = [
    {
      name: 'facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: 'twitter',
      link: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    },
    {
      name: 'whatsapp',
      link: `whatsapp://send?text=${text}\n${url}`,
    },
    {
      name: 'telegram',
      link: `https://t.me/share/url?url=${url}&text=${text}`,
    },
    {
      name: 'linkedin',
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
    },
  ]
  return (
    <ul class='flex overflow-x-scroll gap-3 py-2'>
      {socialMediaList.map((media) => (
        <li key={media.name}>
          <a
            target='_blank'
            rel='nooopener noreferrer'
            href={media.link}
          >
            <SocialMediaIcon
              socialMedia={media.name as SocialMediaTypes}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialMediaShareList
