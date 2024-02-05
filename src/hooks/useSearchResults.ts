import Fuse from 'fuse.js';
import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';

import type { Snap } from '../features';

type QueryData = {
  allSnap: {
    nodes: Snap[];
  };
};

/**
 * Get the search results for the given query.
 *
 * @param query - The query to search for.
 * @returns The search results.
 */
export function useSearchResults(query: string) {
  const { allSnap } = useStaticQuery<QueryData>(graphql`
    query {
      allSnap {
        nodes {
          snapId
          name
          summary
          description {
            description
          }
        }
      }
    }
  `);

  const fuse = useMemo(
    () =>
      new Fuse(allSnap.nodes, {
        keys: [
          {
            name: 'name',
            weight: 1,
          },
          {
            name: 'summary',
            weight: 0.25,
          },
          {
            name: 'description',
            weight: 0.25,
            getFn: (snap) => snap.description.description,
          },
        ],
        threshold: 0.3,
      }),
    [allSnap.nodes],
  );

  const results = useMemo(() => {
    return fuse.search(query).map(({ item }) => item);
  }, [fuse, query]);

  return results;
}
