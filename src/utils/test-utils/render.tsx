import { ChakraProvider } from '@chakra-ui/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
  render as renderComponent,
  renderHook as renderHookTest,
} from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { messages } from '../../locales/en/messages';
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

/**
 * Wrap a React element in the necessary providers.
 *
 * @param children - The element to wrap.
 * @param store - The store to use. Defaults to a new store.
 * @returns The wrapped element.
 */
function wrapChildren(children: ReactElement, store = createStore()) {
  return (
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <ChakraProvider>{children}</ChakraProvider>
      </I18nProvider>
    </Provider>
  );
}

/**
 * Render a React element, wrapped in the necessary providers.
 *
 * @param element - The element to render.
 * @param store - The store to use. Defaults to a new store.
 * @returns The rendered element.
 */
export function render(element: ReactElement, store = createStore()) {
  return renderComponent(element, {
    wrapper: ({ children }) => wrapChildren(children, store),
  });
}

/**
 * Render a hook, wrapped in the necessary providers.
 *
 * @param hook - The hook to render.
 * @param store - The store to use. Defaults to a new store.
 * @returns The rendered hook.
 */
export function renderHook(hook: () => unknown, store = createStore()) {
  return renderHookTest(() => hook(), {
    wrapper: ({ children }) => wrapChildren(children, store),
  });
}
