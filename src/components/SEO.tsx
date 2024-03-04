import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';

import defaultBanner from '../assets/images/seo/home.png';
import type { Fields } from '../utils';

export type SEOProps = {
  title?: string;
  description?: string;
  banner?: string;
  locale: string;
};

type QueryData = {
  site: {
    siteMetadata: Fields<
      Queries.SiteSiteMetadata,
      'title' | 'description' | 'author' | 'siteUrl'
    >;
  };
};

export const SEO: FunctionComponent<SEOProps> = ({
  title,
  description,
  banner = withPrefix(defaultBanner),
  locale,
}) => {
  const {
    site: {
      siteMetadata: {
        title: defaultTitle,
        description: defaultDescription,
        author,
        siteUrl,
      },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const metaTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;
  const metaDescription = description ?? defaultDescription;
  const ogTitle = title ?? defaultTitle;
  const ogImage = `${siteUrl}${banner}`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={ogImage} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
