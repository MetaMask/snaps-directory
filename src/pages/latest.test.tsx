import { describe } from '@jest/globals';
import { navigate } from 'gatsby';

import Latest from './latest';
import { getOrder } from '../features';
import { Order } from '../features/filter/constants';
import { createStore } from '../store';
import { getMockPageContext, render } from '../utils/test-utils';

describe('Latest page', () => {
  it('renders', () => {
    expect(() =>
      render(
        <Latest
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

  it('sets the order', () => {
    const store = createStore();
    expect(getOrder(store.getState())).toBe(Order.Popularity);

    render(
      <Latest
        pageContext={getMockPageContext()}
        data={{
          file: {
            publicURL: 'foo',
          },
        }}
      />,
      store,
    );

    expect(getOrder(store.getState())).toBe(Order.Latest);
  });

  it('redirects to the main page', () => {
    render(
      <Latest
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
