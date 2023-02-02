import { dotEnvConfig } from '../config/dept.ts';
import { VideoDetails, YoutubeAPIResponse } from '../types/videos.d.ts';

await dotEnvConfig({ export: true });

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
      thumbnail: e.snippet.thumbnails.medium.url,
      title: e.snippet.title,
      date: e.snippet.publishedAt,
      id: e.id.videoId,
      tags: getTagsFromTitle(e.snippet.title),
    }));

    return details;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// todo: temporal implementation
const getTagsFromTitle = (title: string): VideoDetails['tags'] => {
  const foo = title.toLowerCase();
  switch (true) {
    case foo.includes('advenjs'):
      return ['javascript', 'logica', 'typescript'];
    case foo.includes('practicando css'):
      return ['css', 'html'];
    case foo.includes('curso frontend'):
      return ['css', 'html', 'javascript'];
    default:
      return ['javascript', 'typescript'];
  }
};
