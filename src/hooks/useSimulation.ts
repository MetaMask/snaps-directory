import type { AbstractExecutionService } from '@metamask/snaps-controllers';
import { IframeExecutionService } from '@metamask/snaps-controllers';
import { HandlerType, unwrapError } from '@metamask/snaps-utils';
import type { Json, JsonRpcError, JsonRpcRequest } from '@metamask/utils';
import { useEffect, useState } from 'react';

import { installSnap } from '../utils/simulation';

export const useSimulation = (snapId: string) => {
  const [executionService, setExecutionService] =
    useState<AbstractExecutionService<unknown> | null>(null);
  const [response, setResponse] = useState<Json>(null);
  const [error, setError] = useState<JsonRpcError | null>(null);

  useEffect(() => {
    installSnap(snapId, {
      executionService: IframeExecutionService,
      executionServiceOptions: {
        iframeUrl: 'https://execution.metamask.io/3.4.2/index.html',
      },
    })
      .then((snap) => {
        setExecutionService(snap.executionService);
      })
      .catch(console.error);
  }, []);

  const sendRequest = async (request: Partial<JsonRpcRequest>) => {
    if (!executionService) {
      return null;
    }

    try {
      const result = await executionService.handleRpcRequest(snapId, {
        handler: HandlerType.OnRpcRequest,
        origin: 'https://snaps.metamask.io',
        request,
      });

      setResponse(result as Json);
      return result;
    } catch (wrappedError) {
      const [unwrappedError] = unwrapError(wrappedError);
      setError(unwrappedError.serialize());
      return null;
    }
  };

  return {
    isInstalled: Boolean(executionService),
    request: sendRequest,
    response,
    error,
  };
};
