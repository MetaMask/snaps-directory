import { render } from '../../../utils/test-utils';
import { NoNotifications } from './NoNotifications';

describe('NoNotifications', () => {
  it('renders', () => {
    const { queryByText } = render(<NoNotifications />);

    expect(queryByText('No notifications')).toBeInTheDocument();
  });
});
