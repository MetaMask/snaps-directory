import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import semver from 'semver/preload';

import { snapsApi } from './api';
import type { ApplicationState } from '../../store';
import type { Fields } from '../../utils';

export type Snap = Fields<
  Queries.Snap,
  | 'id'
  | 'snapId'
  | 'name'
  | 'summary'
  | 'icon'
  | 'category'
  | 'gatsbyPath'
  | 'latestVersion'
>;

export type SnapsState = {
  snaps: Snap[] | null;
};

const initialState: SnapsState = {
  snaps: null,
};

export const snapsSlice = createSlice({
  name: 'snaps',
  initialState,
  reducers: {
    setSnaps: (state, action: PayloadAction<Snap[]>) => {
      state.snaps = action.payload;
    },
  },
});

export const { setSnaps } = snapsSlice.actions;

export const getSnaps = createSelector(
  (state: ApplicationState) => state.snaps,
  ({ snaps }) => snaps,
);

export const getInstalledSnaps = createSelector(
  (state: ApplicationState) => state,
  (state) => snapsApi.endpoints.getInstalledSnaps.select()(state).data ?? {},
);

export const getUpdateAvailable = (snapId: string) =>
  createSelector(
    (state: ApplicationState) => ({
      installedSnaps: getInstalledSnaps(state),
      snaps: getSnaps(state),
    }),
    ({ installedSnaps, snaps }) => {
      const installedVersion = installedSnaps?.[snapId]?.version;
      if (!installedVersion) {
        return false;
      }

      const snap = snaps?.find((item) => item.snapId === snapId);
      if (!snap) {
        return false;
      }

      console.log(installedVersion, snap);

      return semver.gt(snap.latestVersion, installedVersion);
    },
  );
