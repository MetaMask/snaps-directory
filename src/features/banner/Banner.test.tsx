import { Banner } from './Banner';
import { render } from '../../utils/test-utils';

describe('Banner', () => {
  it('renders', () => {
    const { queryByText } = render(<Banner snaps={[]} />);
    expect(queryByText('Discover')).toBeInTheDocument();
  });
});
