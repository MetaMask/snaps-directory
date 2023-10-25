import { render } from '../utils/test-utils';
import { Fox } from './Fox';

describe('Fox', () => {
  it('adds the fox to the DOM', () => {
    const { container } = render(<Fox />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('removes the fox from the DOM on unmount', () => {
    const { container, unmount } = render(<Fox />);

    unmount();

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
