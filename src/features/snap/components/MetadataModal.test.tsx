import { MetadataModal } from './MetadataModal';
import type { MockSnap } from '../../../utils/test-utils';
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

  it("doesn't render legal if privacy policy and terms of use are missing", () => {
    const { snap: rawSnap } = getMockSnap();
    const snap = {
      ...rawSnap,
      privacyPolicy: undefined,
      termsOfUse: undefined,
    } as unknown as MockSnap;
    const { queryByText } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByText('Legal')).not.toBeInTheDocument();
  });
});
