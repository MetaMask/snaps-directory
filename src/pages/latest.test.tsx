import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import Latest, { Head } from './latest';
import { getOrder } from '../features';
import { Order } from '../features/filter/constants';
import { createStore } from '../store';
import { render } from '../utils/test-utils';

describe('Latest page', () => {
  it('renders', () => {
    expect(() => render(<Latest />)).not.toThrow();
  });

  it('sets the order', () => {
    const store = createStore();
    expect(getOrder(store.getState())).toBe(Order.Popularity);

    render(<Latest />, store);

    expect(getOrder(store.getState())).toBe(Order.Latest);
  });

  it('redirects to the main page', () => {
    render(<Latest />);
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });

  describe('Head', () => {
    it('renders', async () => {
      const data = {
        file: {
          publicURL: 'foo',
        },
        site: {
          siteMetadata: {
            title: 'foo',
            description: 'bar',
            author: 'baz',
            siteUrl: 'qux',
          },
        },
      };

      const { queryByText } = render(<Head data={data} />);
      expect(
        queryByText('Latest Snaps on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
