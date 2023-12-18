import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import IndexPage, { Head } from '.';
import { render, getMock, getMockSiteMetadata } from '../utils/test-utils';

describe('Index page', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(
      <IndexPage data={{ allSnap: { nodes: [] } }} />,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(queryByText('MetaMask Snaps Directory')).toBeInTheDocument();
    });
  });
});
