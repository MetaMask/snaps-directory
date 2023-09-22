import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';
import { atom } from 'recoil';

import type { IconName } from './components';

export enum RegistrySnapCategory {
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<
  RegistrySnapCategory,
  { name: MessageDescriptor; icon: IconName }
> = {
  [RegistrySnapCategory.Interoperability]: {
    name: defineMessage`Interoperability`,
    icon: 'interoperability',
  },
  [RegistrySnapCategory.Notifications]: {
    name: defineMessage`Notifications`,
    icon: 'notifications',
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: defineMessage`Transaction Insights`,
    icon: 'transactionInsights',
  },
};

export type FilterState = {
  installed: boolean;
  categories: RegistrySnapCategory[];
};

export const INITIAL_CATEGORIES = Object.keys(
  SNAP_CATEGORY_LABELS,
) as RegistrySnapCategory[];

export const INITIAL_FILTER_STATE: FilterState = {
  installed: false,
  categories: INITIAL_CATEGORIES,
};

export const filterState = atom({
  key: 'filter',
  default: INITIAL_FILTER_STATE,
});

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
