import { graphql, useStaticQuery } from 'gatsby';
import shuffle from 'lodash/shuffle';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useMemo } from 'react';

import type { Fields } from '../../utils';

export type Snap = Fields<
  Queries.Snap,
  | 'id'
  | 'snapId'
  | 'name'
  | 'description'
  | 'svgIcon'
  | 'category'
  | 'gatsbyPath'
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
          description
          svgIcon
          latestVersion
          category
          gatsbyPath(filePath: "/snap/{Snap.slug}")
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
