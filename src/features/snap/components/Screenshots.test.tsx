import {
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Screenshots } from './Screenshots';
import { getMockSnap, render } from '../../../utils/test-utils';

const { name, screenshots } = getMockSnap().snap;

describe('Screenshots', () => {
  it('renders', () => {
    const { queryAllByAltText, queryByTestId } = render(
      <Screenshots name={name} screenshots={screenshots} />,
    );

    expect(queryAllByAltText(`Screenshot for ${name}`)).toHaveLength(3);
    expect(queryByTestId('screenshot-modal-0')).not.toBeInTheDocument();
  });

  it('can open and close the modal', async () => {
    const { queryAllByAltText, queryByTestId, getByRole } = render(
      <Screenshots name={name} screenshots={screenshots} />,
    );

    const firstScreenshot = queryAllByAltText(`Screenshot for ${name}`)[0];
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
      <Screenshots name={name} screenshots={screenshots} />,
    );

    const firstScreenshot = queryAllByAltText(`Screenshot for ${name}`)[0];
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
      <Screenshots name={name} screenshots={screenshots} />,
    );

    fireEvent.keyUp(container, {
      code: 'ArrowRight',
    });

    expect(queryByTestId('screenshot-modal-1')).not.toBeInTheDocument();
  });
});
