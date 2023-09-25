import { createApi } from '@reduxjs/toolkit/query/react';

import { request } from '../../store/api';

enum SnapsTag {
  InstalledSnaps = 'InstalledSnaps',
}

export type InstallSnapArgs = {
  snapId: string;
  version: string;
};

export type InstalledSnaps = Record<string, { version: string }>;
export type InstallSnapResult = Record<string, { error: unknown }>;

export const snapsApi = createApi({
  reducerPath: 'snapsApi',
  baseQuery: request,
  tagTypes: [SnapsTag.InstalledSnaps],
  endpoints: (builder) => ({
    getVersion: builder.query<string, void>({
      query: () => ({
        method: 'web3_clientVersion',
      }),
    }),

    getInstalledSnaps: builder.query<InstalledSnaps, void>({
      query: () => ({
        method: 'wallet_getSnaps',
      }),
      providesTags: [SnapsTag.InstalledSnaps],
    }),

    installSnap: builder.mutation<InstallSnapResult, InstallSnapArgs>({
      query: ({ snapId, version }) => ({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: {
            version,
          },
        },
      }),
      transformResponse: (snaps: InstallSnapResult, _, { snapId }) => {
        const error = snaps[snapId]?.error;
        if (error) {
          throw new Error(`Failed to install snap: ${error}`);
        }

        return snaps;
      },
      invalidatesTags: [SnapsTag.InstalledSnaps],
    }),
  }),
});

export const {
  useGetVersionQuery,
  useGetInstalledSnapsQuery,
  useInstallSnapMutation,
} = snapsApi;
