import { dotEnvConfig } from '../config/dept.ts';
import { VideoDetails, YoutubeAPIResponse } from '../types/videos.d.ts';

dotEnvConfig({ export: true });

export const getLatestVideos = async (
  maxResults = 4,
): Promise<VideoDetails[]> => {
  const params = {
    channelId: Deno.env.get('YOUTUBE_CHANNEL_ID'),
    part: 'snippet,id',
    order: 'date',
    maxResults: maxResults,
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
    const filteredVideos = data.items.filter((video) =>
      video.id.kind.endsWith('video')
    );
    const details = filteredVideos.map((e) => ({
      thumbnail: e.snippet.thumbnails.high.url,
      title: e.snippet.title,
      date: e.snippet.publishedAt,
      id: e.id.videoId,
    }));
    return details;
  } catch {
    return [];
  }
};
