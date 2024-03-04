import { describe } from '@jest/globals';

import IndexPage from '.';
import { render, getMockPageContext } from '../utils/test-utils';

describe('Index page', () => {
  it('renders', async () => {
    const { queryByText } = render(
      <IndexPage
        pageContext={getMockPageContext()}
        data={{ allSnap: { nodes: [] } }}
      />,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });
});
