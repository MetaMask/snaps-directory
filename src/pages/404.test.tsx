import { describe } from '@jest/globals';

import NotFoundPage, { Head } from './404';
import { render } from '../utils/test-utils';
import { getMockSiteMetadata } from '../utils/test-utils/queries';

describe('404 page', () => {
  it('renders', () => {
    const { queryByText } = render(<NotFoundPage />);
    expect(
      queryByText("The page you're looking for can't be found."),
    ).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(
        queryByText('Page not found - MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
