import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import Installed from './installed';
import { getInstalled } from '../features';
import { createStore } from '../store';
import { getMockPageContext, render } from '../utils/test-utils';

describe('Installed page', () => {
  it('renders', () => {
    expect(() =>
      render(
        <Installed
          pageContext={getMockPageContext()}
          data={{
            file: {
              publicURL: 'foo',
            },
          }}
        />,
      ),
    ).not.toThrow();
  });

  it('enables the installed filter', () => {
    const store = createStore();
    expect(getInstalled(store.getState())).toBe(false);

    render(
      <Installed
        pageContext={getMockPageContext()}
        data={{
          file: {
            publicURL: 'foo',
          },
        }}
      />,
      store,
    );

    expect(getInstalled(store.getState())).toBe(true);
  });

  it('redirects to the main page', () => {
    render(
      <Installed
        pageContext={getMockPageContext()}
        data={{
          file: {
            publicURL: 'foo',
          },
        }}
      />,
    );
    expect(navigate).toHaveBeenCalledWith('/explore', { replace: true });
  });
});
