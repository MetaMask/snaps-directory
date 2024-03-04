import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import CategoryInstalledPage from './installed';
import { RegistrySnapCategory } from '../../constants';
import { getCategories, getInstalled } from '../../features';
import { createStore } from '../../store';
import {
  render,
  getMockCategory,
  getMockPageContext,
} from '../../utils/test-utils';

describe('Category installed page', () => {
  it('renders', async () => {
    expect(() =>
      render(
        <CategoryInstalledPage
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
      <CategoryInstalledPage
        pageContext={getMockPageContext()}
        data={getMockCategory()}
      />,
      store,
    );

    expect(getCategories(store.getState())).toStrictEqual([
      getMockCategory().category.name,
    ]);
  });

  it('enables the installed filter', () => {
    const store = createStore();
    expect(getInstalled(store.getState())).toBe(false);

    render(
      <CategoryInstalledPage
        pageContext={getMockPageContext()}
        data={getMockCategory()}
      />,
      store,
    );

    expect(getInstalled(store.getState())).toBe(true);
  });

  it('redirects to the main page', () => {
    render(
      <CategoryInstalledPage
        pageContext={getMockPageContext()}
        data={getMockCategory()}
      />,
    );
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });
});
