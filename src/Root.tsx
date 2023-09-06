import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { GatsbyBrowser } from 'gatsby';

import { EthereumProvider, Layout, SnapsProvider } from './components';
import { messages } from './locales/en/messages';

// eslint-disable-next-line import/no-unassigned-import, import/extensions
import './assets/fonts/fonts.css';

i18n.load('en', messages);
i18n.activate('en');

/**
 * Wrap every page in the specified components. This can be used to wrap pages
 * in things like the Layout component. Providers should be specified in the
 * {@link wrapRootElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The page element to wrap.
 * @returns The wrapped page element.
 */
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <Layout>{element}</Layout>;
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
  return (
    <I18nProvider i18n={i18n}>
      <SnapsProvider>
        <EthereumProvider>{element}</EthereumProvider>
      </SnapsProvider>
    </I18nProvider>
  );
};
