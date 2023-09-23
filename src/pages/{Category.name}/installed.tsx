import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SELECT_INSTALLED, SET_CATEGORY, useFilter } from '../../hooks';
import type { RegistrySnapCategory } from '../../state';
import type { Fields } from '../../utils';

export type CategoryInstalledProps = {
  data: {
    category: Fields<Queries.Category, 'name'>;
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
  const [, dispatch] = useFilter();

  useEffect(() => {
    dispatch({
      type: SELECT_INSTALLED,
    });

    dispatch({
      type: SET_CATEGORY,
      payload: data.category.name as RegistrySnapCategory,
    });

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/');
  }, [data.category.name, dispatch]);

  return null;
};

export const query = graphql`
  query ($id: String) {
    category(id: { eq: $id }) {
      name
    }
  }
`;

export default CategoryInstalled;
