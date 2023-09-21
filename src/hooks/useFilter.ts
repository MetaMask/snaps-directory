import { useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';

import type { FilterState, RegistrySnapCategory } from '../state';
import {
  filterState,
  INITIAL_CATEGORIES,
  INITIAL_FILTER_STATE,
} from '../state';

export const SELECT_ALL = 'SELECT_ALL';
export type SelectAllAction = {
  type: typeof SELECT_ALL;
};

export const SELECT_INSTALLED = 'SELECT_INSTALLED';
export type SelectInstalledAction = {
  type: typeof SELECT_INSTALLED;
};

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export type SelectCategoryAction = {
  type: typeof SELECT_CATEGORY;
  payload: RegistrySnapCategory;
};

export type FilterAction =
  | SelectAllAction
  | SelectInstalledAction
  | SelectCategoryAction;

/**
 * A reducer to manage the filter state.
 *
 * The filter state is composed of three parts:
 *
 * - `all`: A boolean indicating whether all snaps should be shown.
 * - `installed`: A boolean indicating whether only installed snaps should be
 * shown.
 * - `categories`: An array of categories to filter by.
 *
 * The `all` and `installed` properties are mutually exclusive. If `all` is
 * `true`, then `installed` must be `false`, and vice versa.
 *
 * @param state - The current filter state.
 * @param action - The action to perform on the filter state.
 * @returns The new filter state.
 */
function reducer(state: FilterState, action: FilterAction) {
  switch (action.type) {
    case SELECT_ALL:
      return INITIAL_FILTER_STATE;

    case SELECT_INSTALLED:
      return {
        ...state,
        all: false,
        installed: true,
        categories: INITIAL_CATEGORIES,
      };

    case SELECT_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        all: false,
        categories: [payload],
      };
    }

    default:
      return state;
  }
}

export type FilterDispatch = (action: FilterAction) => void;

/**
 * A hook to manage the filter state.
 *
 * The filter state is composed of three parts:
 *
 * - `all`: A boolean indicating whether all snaps should be shown.
 * - `installed`: A boolean indicating whether only installed snaps should be
 * shown.
 * - `categories`: An array of categories to filter by.
 *
 * The `all` and `installed` properties are mutually exclusive. If `all` is
 * `true`, then `installed` must be `false`, and vice versa.
 *
 * @returns The state and dispatch functions for the filter state.
 */
export function useFilter() {
  const [state, setState] = useRecoilState(filterState);
  const [reducerState, dispatch] = useReducer(reducer, state);

  useEffect(() => {
    // To persist the filter state, we need to update the Recoil state whenever
    // the reducer state changes.
    setState(reducerState);
  }, [reducerState, setState]);

  // Note: We return the Recoil state instead of the reducer state so that it's
  // synchronized with any components that use the hook.
  return [state, dispatch] as const;
}
