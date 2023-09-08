import { graphql, useStaticQuery } from 'gatsby';
import shuffle from 'lodash/shuffle';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useMemo } from 'react';

import type { Fields } from '../../utils';

export type Snap = Fields<
  Queries.Snap,
  'id' | 'snapId' | 'name' | 'description' | 'icon' | 'category' | 'gatsbyPath'
>;

export const SnapsProviderContext = createContext<Snap[]>([]);

export type SnapsProviderProps = {
  children: ReactNode;
};

type SnapsQueryData = {
  allSnap: {
    nodes: Snap[];
  };
};

export const SnapsProvider: FunctionComponent<SnapsProviderProps> = ({
  children,
}) => {
  const { allSnap } = useStaticQuery<SnapsQueryData>(graphql`
    query {
      allSnap {
        nodes {
          snapId
          name
          summary
          description
          icon
          latestVersion
          category
          gatsbyPath(filePath: "/snap/{Snap.location}/{Snap.slug}")
        }
      }
    }
  `);

  const shuffledSnaps = useMemo(() => shuffle(allSnap.nodes), [allSnap.nodes]);

  return (
    <SnapsProviderContext.Provider value={shuffledSnaps}>
      {children}
    </SnapsProviderContext.Provider>
  );
};
