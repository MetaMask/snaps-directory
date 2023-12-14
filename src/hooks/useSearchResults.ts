import { graphql, useStaticQuery } from 'gatsby';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';

import type { Snap } from '../features';

/**
 * Get the search results for the given query. This will return the search
 * results for the given query, debounced by 300 milliseconds.
 *
 * @param query - The query to search for.
 * @returns The search results.
 */
export function useSearchResults(query: string) {
  const { fusejs } = useStaticQuery<{ fusejs: Queries.fusejs }>(graphql`
    query {
      fusejs {
        index
        data
      }
    }
  `);

  const results = useGatsbyPluginFusejs<Snap>(query, fusejs, {
    threshold: 0.3,
    distance: 300,
  });

  return results.map(({ item }) => item);
}
