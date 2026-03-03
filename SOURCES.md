

## ID slug server component
https://nextjs.org/docs/app/getting-started/server-and-client-components

## Caching
https://nextjs.org/docs/app/guides/caching

- Data returned from fetch is not automatically cached in the Data Cache.
- You can use the `cache` option in fetch to control caching behavior.
- - Next.js automatically renders and caches routes at build time. This is an optimization that allows you to serve the cached route instead of rendering on the server for every request, resulting in faster page loads.



## Modellen naming rationale
De AniList API noemt objecten Media omdat het ook Manga kan bevatten. Als je specifiek voor Anime bouwt, kun je Anime aanhouden, maar Media is dichter bij de bron.
