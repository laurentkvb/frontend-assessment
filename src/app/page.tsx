import Link from 'next/link';
import { fetchGraphQL } from '@/lib/fetchGraphQL';
import { Anime } from '@/types/types';
import { GET_ANIME_LIST } from '@/graphql/queries';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Anime Explorer',
  description: 'Lorem Ipsum',
}

export default async function AnimePage() {
  const data = await fetchGraphQL<Anime>(GET_ANIME_LIST, { page: 1 });
  const animeList = data.Page.media;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Anime Explorer</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeList.map((anime) => (
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
        ))}
      </div>
    </main>
  );
}
