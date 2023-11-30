import { graphql, useStaticQuery } from 'gatsby';
import shuffle from 'lodash/shuffle';
import type { FunctionComponent, ReactNode } from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import type { Snap } from '../features';
import { setSnaps } from '../features';
import type { createStore } from '../store';

export type SnapsProviderProps = {
  store: ReturnType<typeof createStore>;
  children?: ReactNode;
};

type SnapsQueryData = {
  allSnap: {
    nodes: Snap[];
  };
};

export const SnapsProvider: FunctionComponent<SnapsProviderProps> = ({
  store,
  children,
}) => {
  const { allSnap } = useStaticQuery<SnapsQueryData>(graphql`
    query {
      allSnap {
        nodes {
          snapId
          name
          summary
          icon
          latestVersion
          category
          gatsbyPath(filePath: "/snap/{Snap.location}/{Snap.slug}")
          downloads
          lastUpdated
        }
      }
    }
  `);

  useEffect(() => {
    const shuffledSnaps = shuffle(allSnap.nodes);
    store.dispatch(setSnaps(shuffledSnaps));
  }, [store, allSnap.nodes]);

  return <Provider store={store}>{children}</Provider>;
};
