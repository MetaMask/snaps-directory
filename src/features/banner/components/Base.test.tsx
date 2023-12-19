import { Base } from './Base';
import { render } from '../../../utils/test-utils';

describe('Base', () => {
  it('renders', () => {
    const { queryByText, queryByTestId } = render(
      <Base to="/test" external={true}>
        Test
      </Base>,
    );

    expect(queryByText('Test')).toBeInTheDocument();
    expect(queryByTestId('banner-link')).toBeInTheDocument();
    expect(queryByTestId('banner-link')).toHaveAttribute('href', '/test');
  });
});
