  import { fetchGraphQL } from '@/lib/fetchGraphQL';
  import { Anime } from '@/types/types';
  import { GET_ANIME_LIST } from '@/graphql/queries';
  import { Metadata } from 'next';
  import { AnimeCard } from '@/components/AnimeCard/AnimeCard';
  import Link from 'next/link';

  export const metadata: Metadata = {
    title: 'Anime Explorer',
    description: 'Lorem Ipsum',
  };

  export default async function AnimePage({
    searchParams,
  }: {
    searchParams: Promise<{ page?: string }>;
  }) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const data = await fetchGraphQL<Anime>(GET_ANIME_LIST, {
      page: currentPage,
    });

    const { media: animeList, pageInfo } = data.Page;

    return (
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Anime Explorer</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center gap-6">
          <Link
            href={`?page=${currentPage - 1}`}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              currentPage <= 1
                ? 'pointer-events-none opacity-30 bg-gray-200'
                : 'bg-white border shadow-sm hover:shadow-md text-gray-700'
            }`}
          >
            Previous
          </Link>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Page</span>
            <span className="text-xl font-bold text-blue-600">
              {currentPage} <span className="text-gray-300 font-light">/</span> {pageInfo.lastPage}
            </span>
          </div>

          <Link
            href={`?page=${currentPage + 1}`}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              !pageInfo.hasNextPage
                ? 'pointer-events-none opacity-30 bg-gray-200'
                : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-200'
            }`}
          >
            Next
          </Link>
        </div>
      </main>
    );
  }
