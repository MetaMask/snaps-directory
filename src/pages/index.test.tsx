import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import IndexPage, { Head } from '.';
import { render, getMock } from '../utils';
import { getMockSiteMetadata } from '../utils/test-utils/queries';

describe('Index page', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { findByText } = render(<IndexPage />);
    expect(await findByText('Discover Snaps')).toBeDefined();
  });

  describe('Head', () => {
    it('has the correct title', async () => {
      const { findByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(await findByText('MetaMask Snaps Directory')).toBeDefined();
    });
  });
});
