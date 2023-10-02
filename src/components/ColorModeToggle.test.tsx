import { act } from '@testing-library/react';

import { ColorModeToggle } from './ColorModeToggle';
import { render } from '../utils/test-utils';

describe('ColorModeToggle', () => {
  it('renders', () => {
    const { queryByLabelText } = render(<ColorModeToggle />);

    expect(queryByLabelText('Toggle color mode')).toBeInTheDocument();
    expect(queryByLabelText('Enable dark mode')).toBeInTheDocument();
  });

  it('toggles the color mode when clicking', () => {
    const { getByLabelText, queryByLabelText } = render(<ColorModeToggle />);

    expect(queryByLabelText('Enable light mode')).not.toBeInTheDocument();
    expect(queryByLabelText('Enable dark mode')).toBeInTheDocument();

    const toggle = getByLabelText('Toggle color mode');
    act(() => toggle.click());

    expect(queryByLabelText('Enable light mode')).toBeInTheDocument();
    expect(queryByLabelText('Enable dark mode')).not.toBeInTheDocument();
  });
});
