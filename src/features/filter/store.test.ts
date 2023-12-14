import { Order } from './constants';
import {
  filterAll,
  filterSlice,
  getAll,
  getCategories,
  getCategory,
  getFilteredSnaps,
  getInstalled,
  getSearchQuery,
  resetFilters,
  resetSearch,
  setCategory,
  setOrder,
  setSearchQuery,
  setSearchResults,
  toggleCategory,
  toggleInstalled,
} from './store';
import { RegistrySnapCategory } from '../../constants';
import {
  getMockQueryResponse,
  getMockSnap,
  getMockState,
} from '../../utils/test-utils';

describe('filterSlice', () => {
  describe('setSearchQuery', () => {
    it('sets the search query', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        setSearchQuery('foo'),
      );

      expect(state.searchQuery).toBe('foo');
    });
  });

  describe('setSearchResults', () => {
    it('sets the search results', () => {
      const { snap } = getMockSnap();
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        setSearchResults([{ item: snap }]),
      );

      expect(state.searchResults).toStrictEqual([{ item: snap }]);
    });
  });

  describe('resetSearch', () => {
    it('resets the search query and results', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        setSearchQuery('foo'),
      );

      expect(state.searchQuery).toBe('foo');

      const newState = filterSlice.reducer(state, resetSearch());

      expect(newState.searchQuery).toBe('');
      expect(newState.searchResults).toStrictEqual([]);
    });
  });

  describe('filterAll', () => {
    it('sets the filter to all', () => {
      const state = filterSlice.reducer(
        filterSlice.reducer(filterSlice.getInitialState(), toggleInstalled()),
        filterAll(),
      );

      expect(state.installed).toBe(false);
      expect(state.categories).toStrictEqual(
        filterSlice.getInitialState().categories,
      );
    });
  });

  describe('toggleInstalled', () => {
    it('toggles the installed filter', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        toggleInstalled(),
      );

      expect(state.installed).toBe(true);
    });

    it('sets the categories to all if installed is toggled on', () => {
      const state = filterSlice.reducer(
        filterSlice.reducer(
          filterSlice.getInitialState(),
          setCategory(RegistrySnapCategory.TransactionInsights),
        ),
        toggleInstalled(),
      );

      expect(state.installed).toBe(true);
      expect(state.categories).toStrictEqual(
        filterSlice.getInitialState().categories,
      );
    });

    it('does not change the categories if installed is toggled off', () => {
      const state = filterSlice.reducer(
        filterSlice.reducer(
          filterSlice.reducer(filterSlice.getInitialState(), toggleInstalled()),
          setCategory(RegistrySnapCategory.TransactionInsights),
        ),
        toggleInstalled(),
      );

      expect(state.installed).toBe(false);
      expect(state.categories).toStrictEqual([
        RegistrySnapCategory.TransactionInsights,
      ]);
    });
  });

  describe('toggleCategory', () => {
    it('toggles the category', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        toggleCategory(RegistrySnapCategory.TransactionInsights),
      );

      expect(state.categories).toStrictEqual([
        RegistrySnapCategory.Interoperability,
        RegistrySnapCategory.Notifications,
      ]);

      const newState = filterSlice.reducer(
        state,
        toggleCategory(RegistrySnapCategory.TransactionInsights),
      );

      expect(newState.categories).toStrictEqual([
        RegistrySnapCategory.Interoperability,
        RegistrySnapCategory.Notifications,
        RegistrySnapCategory.TransactionInsights,
      ]);
    });

    it('sets the categories to all if all categories are toggled off', () => {
      const state = filterSlice.reducer(
        filterSlice.reducer(
          filterSlice.reducer(
            filterSlice.getInitialState(),
            toggleCategory(RegistrySnapCategory.Notifications),
          ),
          toggleCategory(RegistrySnapCategory.TransactionInsights),
        ),
        toggleCategory(RegistrySnapCategory.Interoperability),
      );

      expect(state.categories).toStrictEqual(
        filterSlice.getInitialState().categories,
      );
    });
  });

  describe('setCategory', () => {
    it('sets the category', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        setCategory(RegistrySnapCategory.TransactionInsights),
      );

      expect(state.categories).toStrictEqual([
        RegistrySnapCategory.TransactionInsights,
      ]);
    });
  });

  describe('setOrder', () => {
    it('sets the order', () => {
      const state = filterSlice.reducer(
        filterSlice.getInitialState(),
        setOrder(Order.Alphabetical),
      );

      expect(state.order).toBe(Order.Alphabetical);
    });
  });

  describe('resetFilters', () => {
    it('resets to the initial state', () => {
      const state = filterSlice.reducer(
        {
          installed: true,
          searchQuery: 'foo',
          searchResults: [],
          categories: [RegistrySnapCategory.Interoperability],
          order: Order.Latest,
        },
        resetFilters(),
      );

      expect(state).toBe(filterSlice.getInitialState());
    });
  });

  describe('getSearchQuery', () => {
    it('gets the search query', () => {
      const state = getMockState({
        filter: {
          searchQuery: 'foo',
        },
      });

      expect(getSearchQuery(state)).toBe('foo');
    });
  });

  describe('getAll', () => {
    it('returns `false` if not all Snaps are shown', () => {
      const state = getMockState({
        filter: {
          installed: true,
          categories: [],
        },
      });

      expect(getAll(state)).toBe(false);
    });

    it('returns `true` if all Snaps are shown', () => {
      const state = getMockState({
        filter: {
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
        },
      });

      expect(getAll(state)).toBe(true);
    });
  });

  describe('getInstalled', () => {
    it('returns `true` if installed is enabled', () => {
      const state = getMockState({
        filter: {
          installed: true,
          categories: [],
        },
      });

      expect(getInstalled(state)).toBe(true);
    });

    it('returns `false` if installed is disabled', () => {
      const state = getMockState({
        filter: {
          installed: false,
          categories: [],
        },
      });

      expect(getAll(state)).toBe(false);
    });
  });

  describe('getCategories', () => {
    it('returns the categories', () => {
      const state = getMockState({
        filter: {
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
          ],
        },
      });

      expect(getCategories(state)).toStrictEqual([
        RegistrySnapCategory.Interoperability,
        RegistrySnapCategory.Notifications,
      ]);
    });
  });

  describe('getCategory', () => {
    it('returns `true` if the category is enabled', () => {
      const state = getMockState({
        filter: {
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
          ],
        },
      });

      expect(getCategory(RegistrySnapCategory.Interoperability)(state)).toBe(
        true,
      );
    });

    it('returns `false` if the category is disabled', () => {
      const state = getMockState({
        filter: {
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
          ],
        },
      });

      expect(getCategory(RegistrySnapCategory.TransactionInsights)(state)).toBe(
        false,
      );
    });
  });

  describe('getFilteredSnaps', () => {
    it('returns `null` if the Snaps are not loaded', () => {
      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [],
          order: Order.Popularity,
        },
        snaps: {
          snaps: null,
        },
      });

      expect(getFilteredSnaps(state)).toBeNull();
    });

    it('returns all Snaps if the filter is set to all', () => {
      const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
      const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
      const { snap: bazSnap } = getMockSnap({ snapId: 'baz-snap' });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        fooSnap,
        barSnap,
        bazSnap,
      ]);
    });

    it('returns uncategorized snaps in a staging environment', () => {
      // eslint-disable-next-line n/no-process-env
      process.env.GATSBY_STAGING = 'true';

      const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
      const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        category: undefined,
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        fooSnap,
        barSnap,
        bazSnap,
      ]);
    });

    it('returns the Snaps based on the search results', () => {
      const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
      const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
      const { snap: bazSnap } = getMockSnap({ snapId: 'baz-snap' });

      const state = getMockState({
        filter: {
          searchQuery: 'foo',
          searchResults: [fooSnap, barSnap],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([fooSnap, barSnap]);
    });

    it('ignores the search results if the search query is empty', () => {
      const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
      const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
      const { snap: bazSnap } = getMockSnap({ snapId: 'baz-snap' });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [
            {
              item: fooSnap,
            },
            {
              item: barSnap,
            },
          ],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        fooSnap,
        barSnap,
        bazSnap,
      ]);
    });

    it('returns installed Snaps if the filter is set to installed', () => {
      const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
      const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
      const { snap: bazSnap } = getMockSnap({ snapId: 'baz-snap' });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: true,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([fooSnap]);
    });

    it('returns the Snaps within the selected categories', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        category: RegistrySnapCategory.Notifications,
      });

      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        category: RegistrySnapCategory.Interoperability,
      });

      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        category: RegistrySnapCategory.TransactionInsights,
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([fooSnap, bazSnap]);
    });

    it('sorts the Snaps alphabetically', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        name: 'Foo',
      });
      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        name: 'Bar',
      });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        name: 'Baz',
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Alphabetical,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        barSnap,
        bazSnap,
        fooSnap,
      ]);
    });

    it('sorts the Snaps by popularity', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        name: 'Foo',
        downloads: 100,
      });
      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        name: 'Bar',
        downloads: 300,
      });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        name: 'Baz',
        downloads: 5,
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Popularity,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        barSnap,
        fooSnap,
        bazSnap,
      ]);
    });

    it('sorts the Snaps deterministically random', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        name: 'Foo',
      });
      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        name: 'Bar',
      });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        name: 'Baz',
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.DeterministicRandom,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        fooSnap,
        barSnap,
        bazSnap,
      ]);
    });

    it('sorts the Snaps randomly', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        name: 'Foo',
      });
      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        name: 'Bar',
      });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        name: 'Baz',
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Random,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual(
        expect.arrayContaining([barSnap, fooSnap, bazSnap]),
      );
    });

    it('sorts the Snaps by latest', () => {
      const { snap: fooSnap } = getMockSnap({
        snapId: 'foo-snap',
        name: 'Foo',
        lastUpdated: 1701260892,
      });
      const { snap: barSnap } = getMockSnap({
        snapId: 'bar-snap',
        name: 'Bar',
        lastUpdated: 1801260892,
      });
      const { snap: bazSnap } = getMockSnap({
        snapId: 'baz-snap',
        name: 'Baz',
        lastUpdated: 1601260892,
      });

      const state = getMockState({
        filter: {
          searchQuery: '',
          searchResults: [],
          installed: false,
          categories: [
            RegistrySnapCategory.Interoperability,
            RegistrySnapCategory.Notifications,
            RegistrySnapCategory.TransactionInsights,
          ],
          order: Order.Latest,
        },
        snaps: {
          snaps: [fooSnap, barSnap, bazSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [barSnap.snapId]: {
                version: barSnap.latestVersion,
              },
              [fooSnap.snapId]: {
                version: fooSnap.latestVersion,
              },
              [bazSnap.snapId]: {
                version: bazSnap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getFilteredSnaps(state)).toStrictEqual([
        barSnap,
        fooSnap,
        bazSnap,
      ]);
    });
  });
});
