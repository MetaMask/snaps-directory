import { useDispatch } from './useDispatch';
import { getInstalled, toggleInstalled } from '../features';
import { createStore } from '../store';
import { renderHook } from '../utils/test-utils';

describe('useDispatch', () => {
  it('dispatches an action to the store', () => {
    const store = createStore();
    const { result } = renderHook(() => useDispatch(), store);

    expect(getInstalled(store.getState())).toBe(false);
    result.current(toggleInstalled());
    expect(getInstalled(store.getState())).toBe(true);
  });
});
