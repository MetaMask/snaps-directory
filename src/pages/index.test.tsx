import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import IndexPage, { Head } from '.';
import { render, getMock } from '../utils/test-utils';
import { getMockSiteMetadata } from '../utils/test-utils/queries';

describe('Index page', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(<IndexPage />);
    expect(queryByText('Discover Snaps')).toBeDefined();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(queryByText('MetaMask Snaps Directory')).toBeDefined();
    });
  });
});
