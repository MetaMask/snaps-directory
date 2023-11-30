import { t } from '@lingui/macro';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { setOrder } from '../features';
import { Order } from '../features/filter/constants';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

/**
 * This page is used to redirect to the main page, and showing the latest
 * snaps.
 *
 * This page is reachable at `/latest`.
 *
 * @returns The rendered component.
 */
const Latest: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrder(Order.Latest));

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
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
  const name = t`Latest Snaps`;
  const title = t`Latest Snaps on the MetaMask Snaps Directory`;
  const description = t`Explore the latest community-built Snaps to customize your web3 experience.`;

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
    file(name: { eq: "latest-banner" }) {
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

export default Latest;
