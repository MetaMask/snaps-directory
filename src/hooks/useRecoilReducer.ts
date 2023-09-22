import type { Reducer } from 'react';
import type { RecoilState } from 'recoil';
import {
  DefaultValue,
  selector as select,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

/**
 * Creates a Recoil selector that wraps a reducer. The Recoil selector is
 * write-only, and the reducer is used to update the state of the Recoil atom.
 *
 * @param atom - The Recoil atom to wrap.
 * @param reducer - The reducer function.
 * @returns A Recoil selector that wraps the reducer.
 */
export function createReducer<State, Action>(
  atom: RecoilState<State>,
  reducer: Reducer<State, Action>,
) {
  return select<Action>({
    key: `${atom.key}-dispatch`,
    get: () => {
      throw new Error('The dispatch function is read-only.');
    },
    set: ({ get, set }, action) => {
      if (action instanceof DefaultValue) {
        return;
      }

      set(atom, reducer(get(atom), action));
    },
  });
}

/**
 * A hook that wraps a Recoil atom with a reducer.
 *
 * @param atom - The Recoil atom to wrap.
 * @param reducer - The reducer function.
 * @returns A tuple containing the state and dispatch function.
 */
export function useRecoilReducer<State, Action>(
  atom: RecoilState<State>,
  reducer: RecoilState<Action>,
) {
  const state = useRecoilValue(atom);
  const dispatch = useSetRecoilState(reducer);

  return [state, dispatch] as const;
}
