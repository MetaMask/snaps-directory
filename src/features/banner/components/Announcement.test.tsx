import { Announcement } from './Announcement';
import { render } from '../../../utils/test-utils';

describe('Announcement', () => {
  it('renders', () => {
    const { queryByText, queryByTestId } = render(
      <Announcement live={false}>Test</Announcement>,
    );

    expect(queryByText('Test')).toBeInTheDocument();
    expect(queryByTestId('live-icon')).not.toBeInTheDocument();
  });

  it('renders a live icon', () => {
    const { queryByText, queryByTestId } = render(
      <Announcement>Test</Announcement>,
    );

    expect(queryByText('Test')).toBeInTheDocument();
    expect(queryByTestId('live-icon')).toBeInTheDocument();
  });
});
