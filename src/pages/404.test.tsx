import { describe } from '@jest/globals';

import NotFoundPage from './404';
import { getMockPageContext, render } from '../utils/test-utils';

describe('404 page', () => {
  it('renders', () => {
    const { queryByText } = render(
      <NotFoundPage pageContext={getMockPageContext()} />,
    );

    expect(
      queryByText("The page you're looking for can't be found."),
    ).toBeInTheDocument();
  });
});
