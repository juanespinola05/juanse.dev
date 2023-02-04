import { FunctionalComponent } from 'preact'
import IconFacebook from 'tabler-icon/brand-facebook.tsx'
import IconLinkedIn from 'tabler-icon/brand-linkedin.tsx'
import IconWhatsapp from 'tabler-icon/brand-whatsapp.tsx'
import IconTelegram from 'tabler-icon/brand-telegram.tsx'
import IconTwitter from 'tabler-icon/brand-twitter.tsx'

const socialIcons = {
  facebook: {
    icon: (color: string) => <IconFacebook color={color} />,
    color: '#1877F2',
  },
  linkedin: {
    icon: (color: string) => <IconLinkedIn color={color} />,
    color: '#0071AC',
  },
  whatsapp: {
    icon: (color: string) => <IconWhatsapp color={color} />,
    color: '#5CD982',
  },
  telegram: {
    icon: (color: string) => <IconTelegram color={color} />,
    color: '#0388CC',
  },
  twitter: {
    icon: (color: string) => <IconTwitter color={color} />,
    color: '#46C1F6',
  },
}

interface SocialMediaIconProps {
  socialMedia: keyof typeof socialIcons
}

const SocialMediaIcon: FunctionalComponent<SocialMediaIconProps> = (
  { socialMedia },
) => {
  const { color, icon } = socialIcons[socialMedia]
  return (
    <div
      class={`rounded-full w-14 h-14 border-1 border-[${color}] grid place-content-center`}
    >
      {icon(color)}
    </div>
  )
}

export default SocialMediaIcon
