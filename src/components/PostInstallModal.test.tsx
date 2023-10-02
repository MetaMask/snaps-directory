import { Text } from '@chakra-ui/react';

import { PostInstallModal } from './PostInstallModal';
import { getMockSnap, render } from '../utils/test-utils';

describe('PostInstallModal', () => {
  it('renders the children', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <PostInstallModal
        isOpen={false}
        onClose={jest.fn()}
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
        name={snap.name}
        icon={snap.icon}
      >
        <Text>Foo</Text>
      </PostInstallModal>,
    );

    expect(queryByText('Installation complete')).toBeInTheDocument();
  });

  it('normalizes the Snap URL', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <PostInstallModal
        isOpen={true}
        onClose={jest.fn()}
        name={snap.name}
        icon={snap.icon}
        website="https://example.com/foo"
      >
        <Text>Foo</Text>
      </PostInstallModal>,
    );

    expect(queryByText('example.com/foo')).toBeInTheDocument();
  });

  it('shows the raw URL if it cannot be parsed', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <PostInstallModal
        isOpen={true}
        onClose={jest.fn()}
        name={snap.name}
        icon={snap.icon}
        website="foo"
      >
        <Text>Foo</Text>
      </PostInstallModal>,
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });
});
