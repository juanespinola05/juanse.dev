export interface PathnameProps {
  pathname?: string
}

export type SocialMediaTypes =
  | 'facebook'
  | 'twitter'
  | 'whatsapp'
  | 'linkedin'
  | 'telegram'

export interface ShareOptions extends Omit<ShareData, 'files'> {}
