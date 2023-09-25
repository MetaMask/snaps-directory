import { t } from '@lingui/macro';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { toggleInstalled } from '../features';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

/**
 * This page is used to redirect to the main page, and only showing installed
 * snaps.
 *
 * This page is reachable at `/installed`.
 *
 * @returns The rendered component.
 */
const Installed: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleInstalled());

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/');
  }, [dispatch]);

  return null;
};

export type HeadProps = {
  data: {
    file: Fields<Queries.File, 'publicURL'>;
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author' | 'siteUrl'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const name = t`Installed Snaps`;
  const title = t`Installed Snaps on the MetaMask Snaps Directory`;
  const description = t`Browse your installed Snaps on the MetaMask Snaps Directory.`;

  const image = `${data.site.siteMetadata.siteUrl}${data.file.publicURL}`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={name} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query {
    file(name: { eq: "main-installed-banner" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;

export default Installed;
