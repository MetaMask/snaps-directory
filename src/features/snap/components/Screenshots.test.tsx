import {
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Screenshots } from './Screenshots';
import { getMockScreenshots, render } from '../../../utils/test-utils';

const screenshots = getMockScreenshots();

describe('Screenshots', () => {
  it('renders', () => {
    const { queryAllByAltText, queryByTestId } = render(
      <Screenshots screenshots={screenshots} />,
    );

    expect(queryAllByAltText('Snap image')).toHaveLength(3);
    expect(queryByTestId('screenshot-modal-0')).not.toBeInTheDocument();
  });

  it('can open and close the modal', async () => {
    const { queryAllByAltText, queryByTestId, getByRole } = render(
      <Screenshots screenshots={screenshots} />,
    );

    const firstScreenshot = queryAllByAltText('Snap image')[0];
    act(() => firstScreenshot.click());

    expect(queryByTestId('screenshot-modal-0')).toBeInTheDocument();

    const dialog = getByRole('dialog');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const overlay = dialog.parentElement!;

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    await waitForElementToBeRemoved(queryByTestId('screenshot-modal-0'));
  });

  it('can switch between screenshots', () => {
    const { queryAllByAltText, queryByTestId, container } = render(
      <Screenshots screenshots={screenshots} />,
    );

    const firstScreenshot = queryAllByAltText('Snap image')[0];
    act(() => firstScreenshot.click());

    expect(queryByTestId('screenshot-modal-0')).toBeInTheDocument();

    fireEvent.keyUp(container, {
      code: 'ArrowRight',
    });

    expect(queryByTestId('screenshot-modal-1')).toBeInTheDocument();

    fireEvent.keyUp(container, {
      code: 'ArrowLeft',
    });

    expect(queryByTestId('screenshot-modal-0')).toBeInTheDocument();

    fireEvent.keyUp(container, {
      code: 'ArrowDown',
    });

    expect(queryByTestId('screenshot-modal-0')).toBeInTheDocument();
  });

  it('using the arrow keys should not display a screenshot one hasnt been clicked', () => {
    const { queryByTestId, container } = render(
      <Screenshots screenshots={screenshots} />,
    );

    fireEvent.keyUp(container, {
      code: 'ArrowRight',
    });

    expect(queryByTestId('screenshot-modal-1')).not.toBeInTheDocument();
  });
});
