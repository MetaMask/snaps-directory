import { act } from 'react-dom/test-utils';

import { useSelector } from './useSelector';
import { getInstalled, toggleInstalled } from '../features';
import { createStore } from '../store';
import { renderHook } from '../utils/test-utils';

describe('useSelector', () => {
  it('selects a value from the store', async () => {
    const store = createStore();
    const { result } = renderHook(() => useSelector(getInstalled), store);

    expect(result.current).toBe(false);

    await act(() => store.dispatch(toggleInstalled()));

    expect(result.current).toBe(true);
  });
});
