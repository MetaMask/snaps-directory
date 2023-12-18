import { CreateSnapBanner } from './CreateSnapBanner';
import { render } from '../../../../utils/test-utils';

describe('CreateSnapBanner', () => {
  it('renders the banner', () => {
    const { queryByText } = render(<CreateSnapBanner />);

    expect(queryByText('Create your own Snap')).toBeInTheDocument();
  });
});
