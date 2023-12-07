import { NoNotifications } from './NoNotifications';
import { render } from '../../../utils/test-utils';

describe('NoNotifications', () => {
  it('renders', () => {
    const { queryByText } = render(<NoNotifications />);

    expect(queryByText('No updates')).toBeInTheDocument();
  });
});
