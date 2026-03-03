import Link from 'next/link';
import { GetAnimeListResponse } from '@/types/types';

interface AnimeCardProps {
  anime: GetAnimeListResponse;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link
      key={anime.id}
      href={`/${anime.id}`}
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3 bg-white flex-grow border-t">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
          {anime.title.english || anime.title.romaji}
        </p>
      </div>
    </Link>
  );
};
