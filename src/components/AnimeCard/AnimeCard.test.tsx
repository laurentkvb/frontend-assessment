import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { AnimeCard } from './AnimeCard';
import { GetAnimeListResponse } from '@/types/types';

const mockAnime: GetAnimeListResponse = {
  averageScore: 0,
  description: 'Lorem',
  bannerImage: 'https://example.com/cover.jpg',
  episodes: 12,
  id: 123,
  title: {
    english: 'Attack on Titan',
    romaji: 'Shingeki no Kyojin',
    native: '進撃の巨人',
  },
  coverImage: {
    large: 'https://example.com/cover.jpg',
    extraLarge: 'https://example.com/extra-large.jpg',
  },
};

describe(AnimeCard.name, () => {
  it('renders AnimeCard unchanged', () => {
    const { container } = render(<AnimeCard anime={mockAnime} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the anime title and image correctly', () => {
    render(<AnimeCard anime={mockAnime} />);

    expect(screen.getByText('Attack on Titan')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockAnime.coverImage.large);
    expect(image).toHaveAttribute('alt', 'Attack on Titan');
  });

  it('links to the correct detail page', () => {
    render(<AnimeCard anime={mockAnime} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/123');
  });

  it('falls back to romaji title if english title is missing', () => {
    const animeWithoutEnglish = {
      ...mockAnime,
      title: { ...mockAnime.title, english: '' },
    };

    render(<AnimeCard anime={animeWithoutEnglish} />);

    expect(screen.getByText('Shingeki no Kyojin')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Shingeki no Kyojin');
  });
});
