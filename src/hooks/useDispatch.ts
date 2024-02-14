import { useDispatch as useReduxDispatch } from 'react-redux';

import type { ApplicationDispatch } from '../store';

/**
 * A hook to access the Redux dispatch function.
 *
 * This is a wrapper around the `useDispatch` hook from `react-redux`, to
 * provide a type-safe `Dispatch` type.
 *
 * @returns The Redux dispatch function.
 */
export function useDispatch(): ApplicationDispatch {
  return useReduxDispatch();
}