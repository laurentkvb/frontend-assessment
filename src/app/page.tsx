import { fetchGraphQL } from '@/lib/fetchGraphQL';
import { Anime } from '@/types/types';
import { GET_ANIME_LIST } from '@/graphql/queries';
import { Metadata } from 'next';
import { AnimeCard } from '@/components/AnimeCard/AnimeCard';
 
export const metadata: Metadata = {
  title: 'Anime Explorer',
  description: 'Lorem Ipsum',
};

export default async function AnimePage() {
  const data = await fetchGraphQL<Anime>(GET_ANIME_LIST, { page: 1 });
  const animeList = data.Page.media;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Anime Explorer</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </main>
  );
}
