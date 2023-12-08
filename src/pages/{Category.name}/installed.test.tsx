import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import CategoryInstalledPage, { Head } from './installed';
import { RegistrySnapCategory } from '../../constants';
import { getCategories, getInstalled } from '../../features';
import { createStore } from '../../store';
import { render } from '../../utils/test-utils';
import {
  getMockCategory,
  getMockSiteMetadata,
} from '../../utils/test-utils/queries';

describe('Category installed page', () => {
  it('renders', async () => {
    expect(() =>
      render(<CategoryInstalledPage data={getMockCategory()} />),
    ).not.toThrow();
  });

  it('enables the category filter', () => {
    const store = createStore();
    expect(getCategories(store.getState())).toStrictEqual(
      Object.values(RegistrySnapCategory),
    );

    render(<CategoryInstalledPage data={getMockCategory()} />, store);

    expect(getCategories(store.getState())).toStrictEqual([
      getMockCategory().category.name,
    ]);
  });

  it('enables the installed filter', () => {
    const store = createStore();
    expect(getInstalled(store.getState())).toBe(false);

    render(<CategoryInstalledPage data={getMockCategory()} />, store);

    expect(getInstalled(store.getState())).toBe(true);
  });

  it('redirects to the main page', () => {
    render(<CategoryInstalledPage data={getMockCategory()} />);
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(
        <Head data={{ ...getMockCategory(), ...getMockSiteMetadata() }} />,
      );

      expect(
        queryByText('Installed Security Snaps on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
