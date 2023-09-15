import { atom } from 'recoil';

import type { RegistrySnapCategory } from './components';
import { SNAP_CATEGORY_LABELS } from './components';

/**
 * The search query.
 */
export const queryState = atom({
  key: 'query',
  default: '',
});

/**
 * The selected categories in the filter.
 */
export const categoriesState = atom({
  key: 'categories',
  default: Object.keys(SNAP_CATEGORY_LABELS) as RegistrySnapCategory[],
});
