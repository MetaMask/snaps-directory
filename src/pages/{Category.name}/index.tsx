import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SEO } from '../../components';
import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { setCategory } from '../../features';
import { useDispatch } from '../../hooks';
import type { Fields } from '../../utils';

export type CategoryProps = {
  pageContext: {
    locale: string;
  };
  data: {
    category: Fields<Queries.Category, 'name' | 'banner'>;
  };
};

const Head: FunctionComponent<CategoryProps> = ({ data, pageContext }) => {
  const { _ } = useLingui();

  const category = data.category.name as RegistrySnapCategory;
  const { name, description } = SNAP_CATEGORY_LABELS[category];

  const nameText = _(name);
  const descriptionText = _(description);
  const title = _(t`${nameText} Snaps on the MetaMask Snaps Directory`);
  const ogTitle = _(t`${nameText} Snaps`);

  return (
    <SEO
      locale={pageContext.locale}
      title={title}
      ogTitle={ogTitle}
      description={descriptionText}
      banner={data.category.banner.publicURL}
    />
  );
};

/**
 * This page is used to redirect to the main page, while setting the category
 * filter to the current category.
 *
 * This page is reachable at `/{category}`.
 *
 * @param props - The component props.
 * @param props.data - The page data.
 * @param props.pageContext - The page context.
 * @returns The rendered component.
 */
const Category: FunctionComponent<CategoryProps> = ({ data, pageContext }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(data.category.name as RegistrySnapCategory));

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
  }, [data.category.name, dispatch]);

  return <Head data={data} pageContext={pageContext} />;
};

export const query = graphql`
  query ($id: String) {
    category(id: { eq: $id }) {
      name
      banner {
        publicURL
      }
    }
  }
`;

export default Category;
