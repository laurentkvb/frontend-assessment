export const GET_ANIME_DETAIL = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    episodes
    averageScore
    description
    genres
  }
}
`;

export const GET_ANIME_LIST = `
query ($page: Int) {
  Page(page: $page, perPage: 20) { 
    media(type: ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
    }   
  }
}
`;

