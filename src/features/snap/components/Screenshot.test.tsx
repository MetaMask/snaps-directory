import { act } from '@testing-library/react';

import { Screenshot } from './Screenshot';
import { getMockSnap, render } from '../../../utils/test-utils';

const { name, screenshots } = getMockSnap().snap;
const image = screenshots[0].childImageSharp.medium;

describe('Screenshot', () => {
  it('renders', () => {
    const { queryByAltText } = render(
      <Screenshot
        name={name}
        index={0}
        image={image}
        setShownScreenshot={jest.fn()}
      />,
    );

    expect(queryByAltText(`Screenshot for ${name}`)).toBeInTheDocument();
  });

  it('calls setShownScreenshot with index when clicked', () => {
    const setShownScreenshot = jest.fn();
    const { queryByAltText } = render(
      <Screenshot
        name={name}
        index={2}
        image={image}
        setShownScreenshot={setShownScreenshot}
      />,
    );

    const screenshot = queryByAltText(`Screenshot for ${name}`);
    act(() => screenshot.click());
    expect(setShownScreenshot).toHaveBeenCalledWith(2);
  });
});
