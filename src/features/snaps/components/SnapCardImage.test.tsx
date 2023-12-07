import { SnapCardImage } from './SnapCardImage';
import { render } from '../../../utils/test-utils';

describe('SnapCardImage', () => {
  it('renders', () => {
    const { getByTestId } = render(<SnapCardImage name="foo" icon="bar" />);

    expect(getByTestId('snap-card-image')).toBeInTheDocument();
  });
});
