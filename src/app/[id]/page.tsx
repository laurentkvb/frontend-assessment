import Link from 'next/link';
import { fetchGraphQL } from '@/lib/fetchGraphQL';
import { GetAnimeDetailResponse } from '@/types/types';
import { GET_ANIME_DETAIL } from '@/graphql/queries';
import { Metadata } from 'next';

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AnimeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<GetAnimeDetailResponse>(GET_ANIME_DETAIL, { id: parseInt(id) });
  const anime = data?.Media;

  return {
    title: anime
      ? `${anime.title.english || anime.title.romaji} | Anime Explorer`
      : 'Anime not found',
    description: anime?.description?.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    throw new Error('The provided id must be a number');
  }

  const data = await fetchGraphQL<GetAnimeDetailResponse>(GET_ANIME_DETAIL, { id: parseInt(id) });
  const anime = data?.Media;

  if (!anime) {
    throw new Error('This anime doesnt exist');
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="relative h-64 md:h-96 w-full bg-gray-200 overflow-hidden">
        {anime.bannerImage ? (
          <img src={anime.bannerImage} alt="banner" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.english}
              className="w-64 rounded-lg shadow-2xl border-4 border-white"
            />
          </div>

          <div className="flex-grow mt-32 md:mt-40 text-gray-900">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
              <span className="mr-1">←</span> Back to Overview
            </Link>

            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {anime.title.english || anime.title.romaji}
            </h1>

            <div className="flex flex-wrap gap-4 items-center text-sm font-semibold text-gray-600 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {anime.episodes || '?'} Episodes
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                ★ {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : 'N/A'}
              </span>
            </div>

            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              <h3 className="text-xl font-bold mb-2">Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: anime.description }}
                className="[&>br]:mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
