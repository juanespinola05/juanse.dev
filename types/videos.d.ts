export interface VideoDetails {
  id: string;
  thumbnail: string;
  title: string;
  date: Date;
}

export interface VideoFromAPI {
  id: {
    videoId: string;
    kind: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: Date;
  };
}

export interface YoutubeAPIResponse {
  items: VideoFromAPI[];
}
