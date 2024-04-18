import { InstallationCount } from './InstallationCount';
import { render } from '../utils/test-utils';

describe('InstallationCount', () => {
  it('renders specific format for more than a thousand installs', async () => {
    const { queryByText } = render(<InstallationCount installs={1_000_000} />);

    expect(queryByText('1M installs')).toBeInTheDocument();
  });

  it('renders specific format for less  than a thousand installs', async () => {
    const { queryByText } = render(<InstallationCount installs={999} />);

    expect(queryByText('< 1K installs')).toBeInTheDocument();
  });

  it('renders specific format for more than a thousand installs in minimal variant', async () => {
    const { queryByText } = render(
      <InstallationCount minimal={true} installs={1_000_000} />,
    );

    expect(queryByText('1M')).toBeInTheDocument();
  });

  it('renders specific format for less  than a thousand installs in minimal variant', async () => {
    const { queryByText } = render(
      <InstallationCount minimal={true} installs={999} />,
    );

    expect(queryByText('< 1K')).toBeInTheDocument();
  });
});
