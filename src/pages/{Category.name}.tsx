import { graphql, navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { SET_CATEGORY, useFilter } from '../hooks';
import type { RegistrySnapCategory } from '../state';
import type { Fields } from '../utils';

export type CategoryProps = {
  data: {
    category: Fields<Queries.Category, 'name'>;
  };
};

const Category: FunctionComponent<CategoryProps> = ({ data }) => {
  const [, dispatch] = useFilter();

  useEffect(() => {
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

export default Category;
