import { act } from '@testing-library/react';

import { Screenshot } from './Screenshot';
import { getMockScreenshots, render } from '../../../utils/test-utils';

const screenshots = getMockScreenshots();
const image = screenshots[0].childImageSharp.medium;

describe('Screenshot', () => {
  it('renders', () => {
    const { queryByAltText } = render(
      <Screenshot index={0} image={image} setShownScreenshot={jest.fn()} />,
    );

    expect(queryByAltText('Snap image')).toBeInTheDocument();
  });

  it('calls setShownScreenshot with index when clicked', () => {
    const setShownScreenshot = jest.fn();
    const { queryByAltText } = render(
      <Screenshot
        index={2}
        image={image}
        setShownScreenshot={setShownScreenshot}
      />,
    );

    const screenshot = queryByAltText('Snap image');
    act(() => screenshot.click());
    expect(setShownScreenshot).toHaveBeenCalledWith(2);
  });
});
