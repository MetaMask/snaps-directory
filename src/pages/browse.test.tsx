import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import IndexPage, { Head } from './browse';
import { render, getMock, getMockSiteMetadata } from '../utils/test-utils';

describe('Index page', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(<IndexPage />);
    expect(queryByText('Discover Snaps')).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(queryByText('MetaMask Snaps Directory')).toBeInTheDocument();
    });
  });
});
