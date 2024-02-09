import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { RenderHookResult } from '@testing-library/react';
import {
  render as renderComponent,
  renderHook as renderHookTest,
} from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { messages } from '../../locales/en-US/messages';
import { createStore } from '../../store';

i18n.load('en', messages);
i18n.activate('en');

Object.assign(globalThis, 'window', {
  matchMedia: () => ({
    matches: false,
    addListener: jest.fn(),
    removeEventListener: jest.fn(),
  }),
});

export type WrapOptions = {
  colorMode?: 'light' | 'dark';
};

/**
 * Wrap a React element in the necessary providers.
 *
 * @param children - The element to wrap.
 * @param store - The store to use. Defaults to a new store.
 * @param options - The options to use.
 * @param options.colorMode - The color mode to use. Defaults to `light`.
 * @returns The wrapped element.
 */
function wrapChildren(
  children: ReactElement,
  store = createStore(),
  { colorMode = 'light' }: WrapOptions = {},
) {
  return (
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <ChakraProvider
          theme={extendTheme({
            config: {
              initialColorMode: colorMode,
              useSystemColorMode: false,
            },
          })}
        >
          {children}
        </ChakraProvider>
      </I18nProvider>
    </Provider>
  );
}

/**
 * Render a React element, wrapped in the necessary providers.
 *
 * @param element - The element to render.
 * @param store - The store to use. Defaults to a new store.
 * @param options - The options to use.
 * @returns The rendered element.
 */
export function render(
  element: ReactElement,
  store = createStore(),
  options?: WrapOptions,
) {
  return renderComponent(element, {
    wrapper: ({ children }) => wrapChildren(children, store, options),
  });
}

/**
 * Render a hook, wrapped in the necessary providers.
 *
 * @param hook - The hook to render.
 * @param store - The store to use. Defaults to a new store.
 * @returns The rendered hook.
 */
export function renderHook<Result>(
  hook: () => Result,
  store = createStore(),
): RenderHookResult<Result, never> {
  return renderHookTest(() => hook(), {
    wrapper: ({ children }) => wrapChildren(children, store),
  });
}
