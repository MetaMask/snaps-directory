import { Text } from '@chakra-ui/react';
import { expect } from '@jest/globals';
import { act } from '@testing-library/react';
import assert from 'assert';
import { useStaticQuery } from 'gatsby';

import { wrapPageElement, wrapRootElement } from './Root';
import { getMock, getMockPageContext, render } from './utils/test-utils';

describe('wrapPageElement', () => {
  it('wraps an element in a Layout component', async () => {
    assert(wrapPageElement);
    const element = wrapPageElement(
      {
        element: <Text>Foo</Text>,
        // @ts-expect-error: - We don't need to provide all of the props.
        props: {
          pageContext: getMockPageContext(),
        },
      },
      {},
    );

    const { queryByText } = await act(
      async () => await act(() => render(element)),
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });

  it('falls back to the default locale', async () => {
    assert(wrapPageElement);
    const element = wrapPageElement(
      {
        element: <Text>Foo</Text>,
        props: {
          // @ts-expect-error: - We don't need to provide all of the props.
          pageContext: {},
        },
      },
      {},
    );

    const { queryByText } = await act(
      async () => await act(() => render(element)),
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});

describe('wrapRootElement', () => {
  it('wraps an element in a providers', () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValueOnce({
      allSnap: {
        nodes: [],
      },
    });

    assert(wrapRootElement);
    const element = wrapRootElement(
      // @ts-expect-error: - We don't need to provide all of the props.
      {
        element: <Text>Foo</Text>,
      },
      {},
    );

    const { queryByText } = render(element);

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
