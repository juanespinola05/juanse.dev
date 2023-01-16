export interface VideoDetails {
  thumbnail: string;
  title: string;
  date: Date;
}

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
