import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render as renderComponent } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { messages } from '../../locales/en/messages';
import { createStore } from '../../store';

i18n.load('en', messages);
i18n.activate('en');

/**
 * Render a React element, wrapped in the necessary providers.
 *
 * @param element - The element to render.
 * @param store - The store to use. Defaults to a new store.
 * @returns The rendered element.
 */
export function render(element: ReactElement, store = createStore()) {
  return renderComponent(element, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
      </Provider>
    ),
  });
}
