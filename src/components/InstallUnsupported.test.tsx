import { act } from '@testing-library/react';

import { InstallUnsupported } from './InstallUnsupported';
import { render } from '../utils/test-utils';

describe('InstallUnsupported', () => {
  it('renders', async () => {
    const { queryByText } = await act(() => render(<InstallUnsupported />));

    expect(queryByText('Add to MetaMask')).toBeInTheDocument();
  });

  it('shows a modal when the button is clicked', async () => {
    const { getByTestId, queryByText } = await act(() =>
      render(<InstallUnsupported />),
    );

    expect(queryByText('Install MetaMask')).not.toBeInTheDocument();

    act(() => {
      getByTestId('install-unsupported-button').click();
    });

    expect(queryByText('Install MetaMask')).toBeInTheDocument();
  });

  it('shows a drawer when the button is clicked on mobile', async () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Android',
    });

    const { getByTestId, queryByText } = await act(() =>
      render(<InstallUnsupported />),
    );

    expect(queryByText('Available on desktop')).not.toBeInTheDocument();

    act(() => {
      getByTestId('install-unsupported-button').click();
    });

    expect(queryByText('Available on desktop')).toBeInTheDocument();
  });
});
