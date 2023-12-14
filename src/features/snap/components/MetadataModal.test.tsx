import { MetadataModal } from './MetadataModal';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('MetadataModal', () => {
  it('renders', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByText('Developer')).toBeInTheDocument();
  });
});
