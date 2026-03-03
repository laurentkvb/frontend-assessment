export interface MediaTitle {
  romaji: string;
  english: string;
  native: string;
}

export interface MediaCover {
  extraLarge: string;
  large: string;
}

export type Anime = {
  Page: {
    media: GetAnimeListResponse[];
  };
};

export interface GetAnimeListResponse {
  id: number;
  title: MediaTitle;
  description: string;
  episodes: number;
  averageScore: number;
  coverImage: MediaCover;
  bannerImage: string;
}

export interface GetAnimeDetailResponse {
  Media: GetAnimeListResponse;
}
