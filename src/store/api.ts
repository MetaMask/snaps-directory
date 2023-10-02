import type { RequestArguments } from '@metamask/providers/dist/BaseProvider';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { getSnapsProvider } from '../utils';

export type Request = {
  method: string;
  params?: unknown[] | Record<string, unknown> | undefined;
};

/**
 * Base request function for all API calls.
 *
 * @param args - The request arguments.
 * @param args.method - The RPC method to call.
 * @param args.params - The parameters to pass to the RPC method.
 * @returns The response from the RPC method.
 */
export const request: BaseQueryFn<Request> = async ({ method, params }) => {
  try {
    const provider = await getSnapsProvider();
    const data =
      (await provider?.request({
        method,
        params,
      } as RequestArguments)) ?? null;

    return { data };
  } catch (error: any) {
    return { error };
  }
};
