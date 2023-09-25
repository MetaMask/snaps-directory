import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { ApplicationState } from '../../store';
import type { Fields } from '../../utils';

export type Snap = Fields<
  Queries.Snap,
  'id' | 'snapId' | 'name' | 'summary' | 'icon' | 'category' | 'gatsbyPath'
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
