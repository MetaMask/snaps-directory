import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import CategoryPage from '.';
import { RegistrySnapCategory } from '../../constants';
import { getCategories } from '../../features';
import { createStore } from '../../store';
import {
  render,
  getMockCategory,
  getMockPageContext,
} from '../../utils/test-utils';

describe('Category page', () => {
  it('renders', async () => {
    expect(() =>
      render(
        <CategoryPage
          pageContext={getMockPageContext()}
          data={getMockCategory()}
        />,
      ),
    ).not.toThrow();
  });

  it('enables the category filter', () => {
    const store = createStore();
    expect(getCategories(store.getState())).toStrictEqual(
      Object.values(RegistrySnapCategory),
    );

    render(
      <CategoryPage
        pageContext={getMockPageContext()}
        data={getMockCategory()}
      />,
      store,
    );

    expect(getCategories(store.getState())).toStrictEqual([
      getMockCategory().category.name,
    ]);
  });

  it('redirects to the main page', () => {
    render(
      <CategoryPage
        pageContext={getMockPageContext()}
        data={getMockCategory()}
      />,
    );
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });
});
