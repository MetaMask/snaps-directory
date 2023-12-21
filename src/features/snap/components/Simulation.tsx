import { Flex, Spinner } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { SimulationInputs } from './SimulationInputs';
import { SimulationResponse } from './SimulationResponse';
import { useSimulation } from '../../../hooks';
import type { Fields } from '../../../utils';

export type SimulationProps = {
  snapId: string;
  method: Fields<
    Queries.SnapMethods,
    'name' | 'params' | 'description' | 'response'
  >;
};

export const Simulation: FunctionComponent<SimulationProps> = ({
  snapId,
  method,
}) => {
  const { isInstalled, request, response, error } = useSimulation(snapId);
  const [state, setState] = useState<Record<string, string | number | boolean>>(
    {},
  );

  const handleChange = (name: string, value: string | number | boolean) => {
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleRequest = () => {
    request({
      method: method.name,
      params: state,
    }).catch(console.error);
  };

  if (!isInstalled) {
    return <Spinner />;
  }

  return (
    <Flex gap="2">
      <SimulationInputs method={method} state={state} onChange={handleChange} />
      <SimulationResponse
        response={response}
        error={error}
        onRequest={handleRequest}
      />
    </Flex>
  );
};
