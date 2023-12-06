import { Order } from './constants';
import { SORT_FUNCTIONS } from './sort';
import { getMockSnap } from '../../utils/test-utils';

describe('SORT_FUNCTIONS', () => {
  describe('Search', () => {
    it('returns the same array', () => {
      const snaps = [getMockSnap().snap, getMockSnap().snap];

      expect(SORT_FUNCTIONS[Order.Search](snaps)).toBe(snaps);
    });
  });
});
