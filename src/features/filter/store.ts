import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { Order } from './constants';
import { SORT_FUNCTIONS } from './sort';
import { RegistrySnapCategory } from '../../constants';
import type { ApplicationState } from '../../store';
import type { Snap } from '../snaps';
import { getInstalledSnaps } from '../snaps';

export type SearchResult = { item: Snap };

export type FilterState = {
  searchQuery: string;
  searchResults: SearchResult[];
  installed: boolean;
  categories: RegistrySnapCategory[];
  order: Order;
};

const INITIAL_CATEGORIES = Object.values(
  RegistrySnapCategory,
) as RegistrySnapCategory[];

const initialState: FilterState = {
  searchQuery: '',
  searchResults: [],
  installed: false,
  categories: INITIAL_CATEGORIES,
  order: Order.Popularity,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.searchResults = action.payload;
    },
    resetSearch: (state) => {
      state.searchQuery = '';
      state.searchResults = [];
    },
    filterAll: (state) => {
      state.installed = false;
      state.categories = INITIAL_CATEGORIES;
    },
    toggleInstalled: (state) => {
      state.installed = !state.installed;

      // If installed is selected, enable all categories.
      if (state.installed) {
        state.categories = INITIAL_CATEGORIES;
      }
    },
    toggleCategory: (state, action: PayloadAction<RegistrySnapCategory>) => {
      const category = action.payload;

      // If the category is already selected, remove it.
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter(
          (value) => value !== category,
        );
      } else {
        // Otherwise, add it.
        state.categories.push(category);
      }

      // If no categories are selected, select all.
      if (state.categories.length === 0) {
        state.categories = INITIAL_CATEGORIES;
      }
    },
    setCategory: (state, action: PayloadAction<RegistrySnapCategory>) => {
      state.categories = [action.payload];
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  resetSearch,
  filterAll,
  toggleInstalled,
  toggleCategory,
  setCategory,
  setOrder,
  resetFilters,
} = filterSlice.actions;

export const getSearchQuery = createSelector(
  (state: ApplicationState) => state.filter,
  ({ searchQuery }) => searchQuery,
);

export const getAll = createSelector(
  (state: ApplicationState) => state.filter,
  ({ installed, categories }) =>
    !installed && categories.length === INITIAL_CATEGORIES.length,
);

export const getInstalled = createSelector(
  (state: ApplicationState) => state.filter,
  ({ installed }) => installed,
);

export const getCategories = createSelector(
  (state: ApplicationState) => state.filter,
  ({ categories }) => categories,
);

export const getCategory = (category: RegistrySnapCategory) =>
  createSelector(
    (state: ApplicationState) => state.filter,
    ({ categories }) => categories.includes(category),
  );

export const getOrder = createSelector(
  (state: ApplicationState) => state.filter,
  ({ order }) => order,
);

export const getFilteredSnaps = createSelector(
  (state: ApplicationState) => state,
  (state) => {
    const { filter, snaps: snapsState } = state;
    const { searchQuery, searchResults, installed, categories, order } = filter;
    const { snaps } = snapsState;

    if (!snaps) {
      return null;
    }

    const sortedSnaps = SORT_FUNCTIONS[order](snaps);
    const searchedSnaps =
      searchQuery.length > 0
        ? (searchResults
            .map((searchResult) =>
              sortedSnaps.find(
                ({ snapId }) => searchResult.item.snapId === snapId,
              ),
            )
            .filter(Boolean) as Snap[])
        : sortedSnaps;

    const installedSnaps = getInstalledSnaps(state);
    const filteredSnaps = installed
      ? searchedSnaps.filter((snap) => Boolean(installedSnaps[snap.snapId]))
      : searchedSnaps;

    return filteredSnaps.filter((snap) =>
      categories.includes(snap?.category as RegistrySnapCategory),
    );
  },
);
