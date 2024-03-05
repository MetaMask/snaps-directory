import { renderHook as renderHookWithoutProviders } from '@testing-library/react';

import { useLocale } from './useLocale';
import { renderHook } from '../utils/test-utils';

describe('useLocale', () => {
  it('returns the locale context', () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        locale: expect.any(String),
        setLocale: expect.any(Function),
      }),
    );
  });

  it('throws an error if used outside of a LocaleProvider', () => {
    expect(() => renderHookWithoutProviders(() => useLocale())).toThrow(
      '`useLocale` must be used within a LocaleProvider.',
    );
  });
});
