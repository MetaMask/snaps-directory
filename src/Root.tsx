import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { GatsbyBrowser } from 'gatsby';

import { Layout, SnapsProvider } from './components';
import { messages } from './locales/en-US/messages';
import { createStore } from './store';

// eslint-disable-next-line import/no-unassigned-import, import/extensions
import './assets/fonts/fonts.css';

i18n.load('en-US', messages);
i18n.activate('en-US');

/**
 * Wrap every page in the specified components. This can be used to wrap pages
 * in things like the Layout component. Providers should be specified in the
 * {@link wrapRootElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param options - The options provided by Gatsby.
 * @param options.element - The page element to wrap.
 * @param options.props - The props for the page.
 * @returns The wrapped page element.
 */
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  return <Layout {...props}>{element}</Layout>;
};

/**
 * Wrap every page in the specified components. This can be used to wrap the
 * root in provider components. Layout components should be specified in the
 * {@link wrapPageElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The root element to wrap.
 * @returns The wrapped root element.
 */
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  // Store needs to be created here instead of in the SnapsProvider component.
  // Otherwise, the store will be recreated on every page change, which will
  // cause the state to be reset.
  const store = createStore();

  return (
    <SnapsProvider store={store}>
      <I18nProvider i18n={i18n}>{element}</I18nProvider>
    </SnapsProvider>
  );
};
