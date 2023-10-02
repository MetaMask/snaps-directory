import { QueryStatus } from '@reduxjs/toolkit/query';
import type { DeepPartial } from 'redux';

import type { ApplicationState } from '../../store';

/**
 * Get a mock application state. This is useful for testing selectors.
 *
 * @param state - The state to mock.
 * @returns The mock state.
 */
export function getMockState(
  state: DeepPartial<ApplicationState>,
): ApplicationState {
  return state as unknown as ApplicationState;
}

/**
 * Get a mock query response, i.e., the value that is stored in the Redux store
 * as a result of a Redux Toolkit query. This is useful for testing selectors.
 *
 * @param data - The mock query response.
 * @returns The mock query response.
 */
export function getMockQueryResponse(data: unknown) {
  return {
    data,
    status: QueryStatus.fulfilled,
    startedTimeStamp: 0,
    fulfilledTimeStamp: 0,
    error: undefined,
    originalArgs: undefined,
    requestId: 'foo',
    endpointName: 'bar',
  } as const;
}
