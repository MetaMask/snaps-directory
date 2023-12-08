import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import CategoryPage, { Head } from '.';
import { RegistrySnapCategory } from '../../constants';
import { getCategories } from '../../features';
import { createStore } from '../../store';
import { render } from '../../utils/test-utils';
import {
  getMockCategory,
  getMockSiteMetadata,
} from '../../utils/test-utils/queries';

describe('Category page', () => {
  it('renders', async () => {
    expect(() =>
      render(<CategoryPage data={getMockCategory()} />),
    ).not.toThrow();
  });

  it('enables the category filter', () => {
    const store = createStore();
    expect(getCategories(store.getState())).toStrictEqual(
      Object.values(RegistrySnapCategory),
    );

    render(<CategoryPage data={getMockCategory()} />, store);

    expect(getCategories(store.getState())).toStrictEqual([
      getMockCategory().category.name,
    ]);
  });

  it('redirects to the main page', () => {
    render(<CategoryPage data={getMockCategory()} />);
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(
        <Head data={{ ...getMockCategory(), ...getMockSiteMetadata() }} />,
      );

      expect(
        queryByText('Security Snaps on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
