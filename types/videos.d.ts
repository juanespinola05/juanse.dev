interface VideoFromAPI {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface YoutubeAPIResponse {
  items: VideoFromAPI[];
}
