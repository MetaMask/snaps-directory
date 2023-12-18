import { act, fireEvent } from '@testing-library/react';

import { Carousel } from './Carousel';
import { render } from '../../../utils/test-utils';

describe('Carousel', () => {
  it('renders the children', () => {
    const { queryByText } = render(
      <Carousel interval={1000}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );

    expect(queryByText('Slide 1')).toBeInTheDocument();
    expect(queryByText('Slide 2')).toBeInTheDocument();
  });

  it('changes the slide every 1s', () => {
    jest.useFakeTimers();
    const { queryByTestId } = render(
      <Carousel interval={1000}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );

    expect(queryByTestId('slide-0')).toHaveStyle('opacity: 1');
    expect(queryByTestId('slide-1')).toHaveStyle('opacity: 0');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(queryByTestId('slide-0')).toHaveStyle('opacity: 0');
    expect(queryByTestId('slide-1')).toHaveStyle('opacity: 1');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(queryByTestId('slide-0')).toHaveStyle('opacity: 1');
    expect(queryByTestId('slide-1')).toHaveStyle('opacity: 0');
  });

  it('changes the slide when clicking on navigation', () => {
    const { queryByTestId, getByTestId } = render(
      <Carousel interval={1000}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );

    expect(queryByTestId('slide-0')).toHaveStyle('opacity: 1');
    expect(queryByTestId('slide-1')).toHaveStyle('opacity: 0');

    fireEvent.click(getByTestId('navigation-1'));

    expect(queryByTestId('slide-0')).toHaveStyle('opacity: 0');
    expect(queryByTestId('slide-1')).toHaveStyle('opacity: 1');
  });
});
