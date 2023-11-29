import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import ExplorePage, { Head } from './explore';
import { render, getMock, getMockSiteMetadata } from '../utils/test-utils';

describe('Explore page', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(<ExplorePage />);
    expect(queryByText('Discover Snaps')).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(queryByText('MetaMask Snaps Directory')).toBeInTheDocument();
    });
  });
});
