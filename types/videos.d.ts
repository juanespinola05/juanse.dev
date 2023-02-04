export interface VideoDetails {
  id: string
  thumbnail: string
  title: string
  date: Date
  tags: VideoTag[]
}

export interface VideoFromAPI {
  id: {
    videoId: string
    kind: string
  }
  snippet: {
    title: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    description: string
    publishedAt: Date
  }
}

export interface YoutubeAPIResponse {
  items: VideoFromAPI[]
}

type VideoTag = 'javascript' | 'html' | 'css' | 'typescript' | 'logica'

interface ChannelDetailFromAPI {
  snippet: {
    title: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    customUrl: string
  }
  statistics: {
    viewCount: string
    subscriberCount: string
    videoCount: string
  }
}
export interface ChannelDetailsFromAPI {
  items: ChannelDetailFromAPI[]
}

export interface ChannelDetails {
  title: string
  thumbnail: string
  viewCount: string
  subscriberCount: string
  channelUrl: string
  videoCount: string
}
