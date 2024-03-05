import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SEO } from '../components';
import { toggleInstalled } from '../features';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

export type InstalledPageProps = {
  pageContext: {
    locale: string;
  };
  data: {
    file: Fields<Queries.File, 'publicURL'>;
  };
};

const Head: FunctionComponent<InstalledPageProps> = ({ pageContext, data }) => {
  const { _ } = useLingui();

  const title = _(t`Installed Snaps on the MetaMask Snaps Directory`);
  const ogTitle = _(t`Installed Snaps`);
  const description = _(
    t`Browse your installed Snaps on the MetaMask Snaps Directory.`,
  );

  return (
    <SEO
      locale={pageContext.locale}
      banner={data.file.publicURL}
      title={title}
      ogTitle={ogTitle}
      description={description}
    />
  );
};

/**
 * This page is used to redirect to the main page, and only showing installed
 * snaps.
 *
 * This page is reachable at `/installed`.
 *
 * @param props - The component props.
 * @param props.data - The data for the page.
 * @param props.pageContext - The page context.
 * @returns The rendered component.
 */
const Installed: FunctionComponent<InstalledPageProps> = ({
  data,
  pageContext,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleInstalled());

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
  }, [dispatch]);

  return <Head data={data} pageContext={pageContext} />;
};

export const query = graphql`
  query {
    file(name: { eq: "main-installed-banner" }) {
      publicURL
    }
  }
`;

export default Installed;
