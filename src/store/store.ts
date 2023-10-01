import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { NoInfer } from '@reduxjs/toolkit/src/tsHelpers';
import type { CombinedState, PreloadedState } from 'redux';

import { snapsSlice, filterSlice, snapsApi } from '../features';

const reducer = combineReducers({
  filter: filterSlice.reducer,
  snaps: snapsSlice.reducer,
  snapsApi: snapsApi.reducer,
});

/**
 * Create the Redux store.
 *
 * @param preloadedState - The initial state of the store.
 * @returns The Redux store.
 */
export function createStore(
  preloadedState: PreloadedState<CombinedState<NoInfer<ApplicationState>>> = {},
) {
  const store = configureStore({
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).concat(snapsApi.middleware),
    reducer,
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

export type ApplicationState = ReturnType<typeof reducer>;

export type ApplicationDispatch = ReturnType<typeof createStore>['dispatch'];
