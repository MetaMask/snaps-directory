import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { setCategory, toggleInstalled } from '../../features';
import { useDispatch } from '../../hooks';
import type { Fields } from '../../utils';

export type CategoryInstalledProps = {
  data: {
    category: Fields<Queries.Category, 'name' | 'installedBanner'>;
  };
};

/**
 * This page is used to redirect to the main page, while setting the category
 * filter to the current category, and only showing installed snaps.
 *
 * This page is reachable at `/{category}/installed`.
 *
 * @param props - The component props.
 * @param props.data - The page data.
 * @returns The rendered component.
 */
const CategoryInstalled: FunctionComponent<CategoryInstalledProps> = ({
  data,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleInstalled());
    dispatch(setCategory(data.category.name as RegistrySnapCategory));

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
  }, [data.category.name, dispatch]);

  return null;
};

type HeadProps = CategoryInstalledProps & {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author' | 'siteUrl'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const i18n = useLingui();

  const category = data.category.name as RegistrySnapCategory;
  const { name } = SNAP_CATEGORY_LABELS[category];
  const image = `${data.site.siteMetadata.siteUrl}${data.category.installedBanner.publicURL}`;

  const nameText = i18n._(name);
  const title = t`Installed ${nameText} Snaps on the MetaMask Snaps Directory`;
  const ogTitle = t`Installed ${nameText} Snaps`;
  const ogDescription = t`Browse your installed ${nameText} Snaps on the MetaMask Snaps Directory`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={ogDescription} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    category(id: { eq: $id }) {
      name
      installedBanner {
        publicURL
      }
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

export default CategoryInstalled;
