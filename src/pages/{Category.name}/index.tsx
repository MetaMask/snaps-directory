import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { setCategory } from '../../features';
import { useDispatch } from '../../hooks';
import type { Fields } from '../../utils';

export type CategoryProps = {
  data: {
    category: Fields<Queries.Category, 'name' | 'banner'>;
  };
};

/**
 * This page is used to redirect to the main page, while setting the category
 * filter to the current category.
 *
 * This page is reachable at `/{category}`.
 *
 * @param props - The component props.
 * @param props.data - The page data.
 * @returns The rendered component.
 */
const Category: FunctionComponent<CategoryProps> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(data.category.name as RegistrySnapCategory));

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
  }, [data.category.name, dispatch]);

  return null;
};

type HeadProps = CategoryProps & {
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
  const { name, description } = SNAP_CATEGORY_LABELS[category];
  const image = `${data.site.siteMetadata.siteUrl}${data.category.banner.publicURL}`;

  const nameText = i18n._(name);
  const descriptionText = i18n._(description);
  const title = t`${nameText} Snaps on the MetaMask Snaps Directory`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={descriptionText} />
      <meta property="og:title" content={nameText} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={nameText} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    category(id: { eq: $id }) {
      name
      banner {
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

export default Category;
