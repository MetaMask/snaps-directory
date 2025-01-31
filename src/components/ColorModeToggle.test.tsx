import { act } from '@testing-library/react';

import { ColorModeToggle } from './ColorModeToggle';
import { render } from '../utils/test-utils';

describe('ColorModeToggle', () => {
  it('renders', () => {
    const { queryAllByLabelText } = render(<ColorModeToggle />);

    expect(queryAllByLabelText('Toggle color mode')).toHaveLength(2);
  });

  it('toggles the color mode when clicking', () => {
    const { queryAllByLabelText, baseElement } = render(<ColorModeToggle />);

    expect(baseElement).toHaveClass('chakra-ui-light');
    expect(queryAllByLabelText('Toggle color mode')).toHaveLength(2);

    const toggle = queryAllByLabelText('Toggle color mode');
    act(() => toggle[0]?.click());

    expect(baseElement).toHaveClass('chakra-ui-dark');
  });
});
