import { dotEnvConfig } from '../config/dept.ts';
import { YoutubeAPIResponse } from '../types/videos.d.ts';

dotEnvConfig({ export: true });

export const getLatestVideos = async () => {
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

  const response = await fetch(
    `https://youtube-v31.p.rapidapi.com/search?${paramString}`,
    options,
  );

  const data: YoutubeAPIResponse = await response.json();
  return data.items.map((e) => e.snippet.thumbnails.medium.url);
};
