import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';

import defaultBanner from '../assets/images/seo/home.png';
import type { Fields } from '../utils';

export type SEOProps = {
  title?: string;
  ogTitle?: string;
  description?: string;
  banner?: string;
  locale: string;
};

type QueryData = {
  site: {
    siteMetadata: Fields<
      Queries.SiteSiteMetadata,
      'title' | 'author' | 'siteUrl'
    >;
  };
};

export const SEO: FunctionComponent<SEOProps> = ({
  title,
  ogTitle = title,
  description,
  banner = withPrefix(defaultBanner),
  locale,
}) => {
  const { _ } = useLingui();
  const {
    site: {
      siteMetadata: { title: defaultTitle, author, siteUrl },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
        }
      }
    }
  `);

  const defaultDescription = _(
    t`Explore community-built Snaps to customize your web3 experience via our official directory.`,
  );

  const metaTitle = title ?? defaultTitle;
  const metaDescription = description ?? defaultDescription;
  const ogImage = `${siteUrl}${banner}`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={ogTitle ?? metaTitle} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={ogImage} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={ogTitle ?? metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
