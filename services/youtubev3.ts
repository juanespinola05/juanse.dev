import { dotEnvConfig } from '../config/dept.ts';
import { VideoDetails, YoutubeAPIResponse } from '../types/videos.d.ts';

dotEnvConfig({ export: true });

export const getLatestVideos = async (): Promise<VideoDetails[]> => {
  const params = {
    channelId: Deno.env.get('YOUTUBE_CHANNEL_ID'),
    part: 'snippet,id',
    order: 'date',
    maxResults: '5',
  };
  const paramString = Object.entries(params)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
  const options: RequestInit = {
    headers: {
      'X-RapidAPI-Key': Deno.env.get('RAPID_API_KEY') ?? '',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  };

  const requestUrl = `https://youtube-v31.p.rapidapi.com/search?${paramString}`;

  try {
    const response = await fetch(requestUrl, options);
    const data: YoutubeAPIResponse = await response.json();
    return data.items.map((e) => ({
      thumbnail: e.snippet.thumbnails.medium.url,
      title: e.snippet.title,
      date: new Date(),
    }));
  } catch {
    return [];
  }
};
