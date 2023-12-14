import shuffle from 'lodash/shuffle';

import { Order } from './constants';
import type { Snap } from '../snaps';

export const SORT_FUNCTIONS = {
  // This will be a random shuffle every call
  [Order.Random]: (snaps: Snap[]) => shuffle(snaps),

  // This will be consistently random for a session
  [Order.DeterministicRandom]: (snaps: Snap[]) => snaps,

  // This is the same as `Order.DeterministicRandom`, but should not be shown
  // in the UI.
  [Order.Search]: (snaps: Snap[]) => snaps,

  [Order.Alphabetical]: (snaps: Snap[]) =>
    snaps.concat().sort((a, b) => a.name.localeCompare(b.name)),

  [Order.Popularity]: (snaps: Snap[]) =>
    snaps.concat().sort((a, b) => b.downloads - a.downloads),

  [Order.Latest]: (snaps: Snap[]) =>
    snaps.concat().sort((a, b) => b.lastUpdated - a.lastUpdated),
};
