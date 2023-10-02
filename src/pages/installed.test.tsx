import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import Installed, { Head } from './installed';
import { getInstalled } from '../features';
import { createStore } from '../store';
import { render } from '../utils/test-utils';

describe('Installed page', () => {
  it('renders', () => {
    expect(() => render(<Installed />)).not.toThrow();
  });

  it('enables the installed filter', () => {
    const store = createStore();
    expect(getInstalled(store.getState())).toBe(false);

    render(<Installed />, store);

    expect(getInstalled(store.getState())).toBe(true);
  });

  it('redirects to the main page', () => {
    render(<Installed />);
    expect(navigate).toHaveBeenCalledWith('/');
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
        queryByText('Installed Snaps on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
