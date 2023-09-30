import { describe } from '@jest/globals';

import NotFoundPage, { Head } from './404';
import { render } from '../utils/test-utils';
import { getMockSiteMetadata } from '../utils/test-utils/queries';

describe('404 page', () => {
  it('renders', async () => {
    const { findByText } = render(<NotFoundPage />);
    expect(
      await findByText("The page you're looking for can't be found."),
    ).toBeDefined();
  });

  describe('Head', () => {
    it('has the correct title', async () => {
      const { findByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(
        await findByText('Page not found - MetaMask Snaps Directory'),
      ).toBeDefined();
    });
  });
});
