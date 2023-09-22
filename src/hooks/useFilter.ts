import { createReducer, useRecoilReducer } from './useRecoilReducer';
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

export const UNSELECT_INSTALLED = 'UNSELECT_INSTALLED';
export type UnselectInstalledAction = {
  type: typeof UNSELECT_INSTALLED;
};

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export type SelectCategoryAction = {
  type: typeof SELECT_CATEGORY;
  payload: RegistrySnapCategory;
};

export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY';
export type UnselectCategoryAction = {
  type: typeof UNSELECT_CATEGORY;
  payload: RegistrySnapCategory;
};

export type FilterAction =
  | SelectAllAction
  | SelectInstalledAction
  | UnselectInstalledAction
  | SelectCategoryAction
  | UnselectCategoryAction;

/**
 * A reducer to manage the filter state.
 *
 * The filter state is composed of two parts:
 *
 * - `installed`: A boolean indicating whether only installed snaps should be
 * shown.
 * - `categories`: An array of categories to filter by.
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
        installed: true,
        categories: INITIAL_CATEGORIES,
      };

    case UNSELECT_INSTALLED:
      return {
        ...state,
        installed: false,
      };

    case SELECT_CATEGORY: {
      const { payload } = action;
      const categories = state.categories.filter(
        (category) => category !== payload,
      );

      return {
        ...state,
        categories: [...categories, payload],
      };
    }

    case UNSELECT_CATEGORY: {
      const { payload } = action;
      const categories = state.categories.filter(
        (category) => category !== payload,
      );

      if (categories.length === 0) {
        if (state.installed) {
          return {
            ...state,
            installed: true,
            categories: INITIAL_CATEGORIES,
          };
        }

        return {
          ...state,
          categories: INITIAL_CATEGORIES,
        };
      }

      return {
        ...state,
        categories,
      };
    }

    default:
      return state;
  }
}

// The Recoil selector is created here to avoid creating it multiple times.
const filterReducer = createReducer(filterState, reducer);

/**
 * A hook to manage the filter state.
 *
 * The filter state is composed of two parts:
 *
 * - `installed`: A boolean indicating whether only installed snaps should be
 * shown.
 * - `categories`: An array of categories to filter by.
 *
 * @returns The state and dispatch functions for the filter state.
 */
export function useFilter() {
  return useRecoilReducer(filterState, filterReducer);
}
