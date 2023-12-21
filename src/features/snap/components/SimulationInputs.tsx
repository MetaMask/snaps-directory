import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { MethodInput } from './MethodInput';
import type { Fields } from '../../../utils';

export type SimulationProps = {
  method: Fields<
    Queries.SnapMethods,
    'name' | 'params' | 'description' | 'response'
  > & {
    params: Fields<
      Queries.SnapMethodsParams,
      'members' | 'type' | 'descriptions'
    >;
  };
};

export const SimulationInputs: FunctionComponent<SimulationProps> = ({
  method,
}) => {
  const [state, setState] = useState<Record<string, string | number | boolean>>(
    {},
  );

  const handleChange = (name: string, value: string | number | boolean) => {
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  return (
    <Box flex="1">
      {method.params.members.map((member) => {
        // TODO: `member` shouldn't be nullable.
        if (!member?.name) {
          return null;
        }

        return (
          <FormControl
            key={`simulation-param-${member.name}`}
            background="background.alternative"
            fontFamily="code"
            marginBottom="2"
            borderRadius="4"
          >
            <Flex flexDirection="row" paddingX="2" paddingY="1">
              <FormLabel
                color="text.muted"
                flexShrink="0"
                margin="0"
                marginRight="2"
              >
                {member.name} =
              </FormLabel>
              <MethodInput
                value={state[member.name] ?? ''}
                param={
                  member as Fields<
                    Queries.SnapMethodsParamsMembers,
                    'name' | 'type'
                  >
                }
                onChange={handleChange}
              />
            </Flex>
          </FormControl>
        );
      })}
    </Box>
  );
};
