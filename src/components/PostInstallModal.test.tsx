import { Text } from '@chakra-ui/react';

import { getMockSnap, render } from '../utils/test-utils';
import { PostInstallModal } from './PostInstallModal';

describe('PostInstallModal', () => {
  it('renders the children', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <PostInstallModal
        isOpen={false}
        onClose={jest.fn()}
        snapId={snap.snapId}
        name={snap.name}
        icon={snap.icon}
      >
        <Text>Foo</Text>
      </PostInstallModal>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });

  it('shows a modal when `isOpen` is true', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <PostInstallModal
        isOpen={true}
        onClose={jest.fn()}
        snapId={snap.snapId}
        name={snap.name}
        icon={snap.icon}
      >
        <Text>Foo</Text>
      </PostInstallModal>,
    );

    expect(queryByText('Installation complete')).toBeInTheDocument();
  });
});
