const API_URL = process.env.ANILIST_API ?? 'https://graphql.anilist.co';

const REVALIDATE_INTERVAL_SECONDS = 60;
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_INTERVAL_SECONDS },
  });

  if (!res.ok) {
    throw new Error('Network error');
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'GraphQL error');
  }

  return json.data;
}
