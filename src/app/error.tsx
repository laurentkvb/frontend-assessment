'use client';

import Link from 'next/link';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-8xl">⨯_⨯</div>

      <h2 className="mb-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Something went wrong!
      </h2>

      <p className="mb-8 text-2xl max-w-md text-gray-600">
        {error.message ||
          "We couldn't fetch the anime data. The spirit world might be down for maintenance."}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
        >
          Back to Overview
        </Link>
      </div>

      {error.digest && <p className="mt-8 text-2xl text-gray-400">Error ID: {error.digest}</p>}
    </main>
  );
}
