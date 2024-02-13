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

  it('renders a warning if the Snap has private code', () => {
    const { snap } = getMockSnap({
      privateCode: true,
    });

    const { queryByLabelText } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByLabelText('Warning')).toBeInTheDocument();
  });
});
