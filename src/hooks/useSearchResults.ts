import { distance as getDistance } from 'fastest-levenshtein';
import { graphql, useStaticQuery } from 'gatsby';

import type { Snap } from '../features';
import type { Fields } from '../utils';

/**
 * Get the Levenshtein distance between the given name and query. This will
 * return the distance between the two strings, or the distance between the
 * closest word in the name and the query.
 *
 * @param name - The name to compare.
 * @param query - The query to compare.
 * @returns The Levenshtein distance.
 */
function getClosestLevenshteinDistance(name: string, query: string) {
  const lowerCaseName = name.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();

  const words = lowerCaseName.split(' ');
  const lowestWords = words.reduce((lowest, word) => {
    const distance = getDistance(word, lowerCaseQuery);
    return distance < lowest ? distance : lowest;
  }, Infinity);

  const fullDistance = getDistance(lowerCaseName, lowerCaseQuery);
  return Math.min(lowestWords, fullDistance);
}

/**
 * Get the search results for the given query. This will return the search
 * results for the given query, debounced by 300 milliseconds.
 *
 * @param query - The query to search for.
 * @returns The search results.
 */
export function useSearchResults(query: string) {
  const { allSnap } = useStaticQuery<{
    allSnap: {
      nodes: Fields<
        Queries.Snap,
        'snapId' | 'name' | 'summary' | 'description'
      >[];
    };
  }>(graphql`
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

  if (!query) {
    return [];
  }

  const results = allSnap.nodes
    .map((snap) => ({
      snap,
      distance: getClosestLevenshteinDistance(snap.name, query),
    }))
    .filter(({ distance }) => distance < 3)
    .sort((a, b) => a.distance - b.distance)
    .map(({ snap }) => snap);

  // TODO: Use proper type.
  return results as unknown as Snap[];
}
