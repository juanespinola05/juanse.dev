import { dotEnvConfig } from '../config/dept.ts'
import {
  ChannelDetails,
  ChannelDetailsFromAPI,
  VideoDetails,
  YoutubeAPIResponse,
} from '../types/videos.d.ts'

await dotEnvConfig({ export: true })

export const getLatestVideos = async (
  maxResults = 4,
): Promise<VideoDetails[]> => {
  const params = stringifyParams({
    channelId: Deno.env.get('YOUTUBE_CHANNEL_ID') ?? '',
    part: 'snippet,id',
    order: 'date',
    maxResults: maxResults,
  })

  const options: RequestInit = {
    headers: {
      'X-RapidAPI-Key': Deno.env.get('RAPID_API_KEY') ?? '',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  }

  const requestUrl = `https://youtube-v31.p.rapidapi.com/search?${params}`

  try {
    const response = await fetch(requestUrl, options)
    const data: YoutubeAPIResponse = await response.json()
    const filteredVideos = data.items.filter((video) =>
      video.id.kind.endsWith('video')
    )
    const details = filteredVideos.map((e) => ({
      thumbnail: e.snippet.thumbnails.medium.url,
      title: e.snippet.title,
      date: e.snippet.publishedAt,
      id: e.id.videoId,
      tags: getTagsFromTitle(e.snippet.title),
    }))

    return details
  } catch (error) {
    console.log(error)
    return []
  }
}

// todo: temporal implementation
const getTagsFromTitle = (title: string): VideoDetails['tags'] => {
  const foo = title.toLowerCase()
  switch (true) {
    case foo.includes('advenjs'):
      return ['javascript', 'logica', 'typescript']
    case foo.includes('practicando css'):
      return ['css', 'html']
    case foo.includes('curso frontend'):
      return ['css', 'html', 'javascript']
    default:
      return ['javascript', 'typescript']
  }
}

export const getChannelDetails = async (): Promise<ChannelDetails> => {
  const params = stringifyParams({
    id: Deno.env.get('YOUTUBE_CHANNEL_ID') ?? '',
    part: 'snippet,id',
  })
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': Deno.env.get('RAPID_API_KEY') ?? '',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  }
  const requestUrl = `https://youtube-v31.p.rapidapi.com/channels?${params}`

  const res = await fetch(requestUrl, options)
  const data: ChannelDetailsFromAPI = await res.json()

  const {
    snippet: { customUrl, thumbnails, title },
    statistics: { videoCount, subscriberCount, viewCount },
  } = data.items[0]
  return {
    title,
    videoCount,
    subscriberCount,
    viewCount,
    thumbnail: thumbnails.medium.url,
    channelUrl: `https://youtube.com/${customUrl}`,
  }
}

function stringifyParams(
  params: Record<string, string | number | boolean>,
): string {
  const paramString = Object.entries(params)
    .map(([key, value]) => {
      return `${key}=${value}`
    })
    .join('&')
  return paramString
}
