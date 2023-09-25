import { configureStore } from '@reduxjs/toolkit';

import { snapsSlice, filterSlice, snapsApi } from '../features';

/**
 * Create the Redux store.
 *
 * @returns The Redux store.
 */
export function createStore() {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
      }).concat(snapsApi.middleware),
    reducer: {
      filter: filterSlice.reducer,
      snaps: snapsSlice.reducer,
      snapsApi: snapsApi.reducer,
    },
  });

  // This prefetches the installed Snaps on app load, so we can show them on the
  // home page.
  store
    .dispatch(
      snapsApi.endpoints.getInstalledSnaps.initiate(undefined, {
        forceRefetch: true,
      }),
    )
    .catch(console.error);

  return store;
}

export type ApplicationState = ReturnType<
  ReturnType<typeof createStore>['getState']
>;

export type ApplicationDispatch = ReturnType<typeof createStore>['dispatch'];
