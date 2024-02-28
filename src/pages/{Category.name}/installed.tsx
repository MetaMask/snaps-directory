import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SEO } from '../../components';
import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { setCategory, toggleInstalled } from '../../features';
import { useDispatch } from '../../hooks';
import type { Fields } from '../../utils';

export type CategoryInstalledProps = {
  pageContext: {
    locale: string;
  };
  data: {
    category: Fields<Queries.Category, 'name' | 'installedBanner'>;
  };
};

const Head: FunctionComponent<CategoryInstalledProps> = ({
  data,
  pageContext,
}) => {
  const i18n = useLingui();

  const category = data.category.name as RegistrySnapCategory;
  const { name } = SNAP_CATEGORY_LABELS[category];

  const nameText = i18n._(name);
  const title = t`Installed ${nameText} Snaps`;
  const description = t`Browse your installed ${nameText} Snaps on the MetaMask Snaps Directory`;

  return (
    <SEO
      locale={pageContext.locale}
      title={title}
      description={description}
      banner={data.category.installedBanner.publicURL}
    />
  );
};

/**
 * This page is used to redirect to the main page, while setting the category
 * filter to the current category, and only showing installed snaps.
 *
 * This page is reachable at `/{category}/installed`.
 *
 * @param props - The component props.
 * @param props.data - The page data.
 * @param props.pageContext - The page context.
 * @returns The rendered component.
 */
const CategoryInstalled: FunctionComponent<CategoryInstalledProps> = ({
  data,
  pageContext,
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

  return <Head data={data} pageContext={pageContext} />;
};

export const query = graphql`
  query ($id: String) {
    category(id: { eq: $id }) {
      name
      installedBanner {
        publicURL
      }
    }
  }
`;

export default CategoryInstalled;
