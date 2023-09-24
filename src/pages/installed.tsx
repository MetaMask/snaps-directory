import { navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { toggleInstalled } from '../features';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

export type CategoryInstalledProps = {
  data: {
    category: Fields<Queries.Category, 'name'>;
  };
};

/**
 * This page is used to redirect to the main page, and only showing installed
 * snaps.
 *
 * This page is reachable at `/installed`.
 *
 * @returns The rendered component.
 */
const Installed: FunctionComponent<CategoryInstalledProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleInstalled());

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/');
  }, [dispatch]);

  return null;
};

export default Installed;
