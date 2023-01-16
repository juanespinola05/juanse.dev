export interface VideoFromAPI {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export interface YoutubeAPIResponse {
  items: VideoFromAPI[];
}
