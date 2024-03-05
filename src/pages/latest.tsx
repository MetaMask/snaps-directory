import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SEO } from '../components';
import { setOrder } from '../features';
import { Order } from '../features/filter/constants';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

export type LatestPageProps = {
  pageContext: {
    locale: string;
  };
  data: {
    file: Fields<Queries.File, 'publicURL'>;
  };
};

const Head: FunctionComponent<LatestPageProps> = ({ data, pageContext }) => {
  const { _ } = useLingui();

  const title = _(t`Latest Snaps on the MetaMask Snaps Directory`);
  const ogTitle = _(t`Latest Snaps`);
  const description = _(
    t`Explore the latest community-built Snaps to customize your web3 experience.`,
  );

  return (
    <SEO
      locale={pageContext.locale}
      title={title}
      ogTitle={ogTitle}
      description={description}
      banner={data.file.publicURL}
    />
  );
};

/**
 * This page is used to redirect to the main page, and showing the latest
 * snaps.
 *
 * This page is reachable at `/latest`.
 *
 * @param props - The component props.
 * @param props.data - The data for the page.
 * @param props.pageContext - The page context.
 * @returns The rendered component.
 */
const Latest: FunctionComponent<LatestPageProps> = ({ data, pageContext }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrder(Order.Latest));

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
  }, [dispatch]);

  return <Head data={data} pageContext={pageContext} />;
};

export const query = graphql`
  query {
    file(name: { eq: "latest-banner" }) {
      publicURL
    }
  }
`;

export default Latest;
