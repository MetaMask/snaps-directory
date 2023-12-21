import { Box, Button, Flex } from '@chakra-ui/react';
import type { Json, JsonRpcError } from '@metamask/utils';
import type { FunctionComponent } from 'react';

import { SimulateIcon } from '../../../components';

export type SimulationResponseProps = {
  response: Json;
  error: JsonRpcError | null;
  onRequest: () => void;
};

export const SimulationResponse: FunctionComponent<SimulationResponseProps> = ({
  response,
  error,
  onRequest,
}) => {
  return (
    <Flex
      flex="1"
      background="background.alternative"
      borderRadius="4"
      paddingX="2"
      paddingY="1"
      paddingBottom="2"
      flexDirection="column"
    >
      <Box minHeight="5rem" fontFamily="code" whiteSpace="pre-wrap">
        {JSON.stringify(error ?? response, null, 2)}
      </Box>
      <Button
        variant="primary"
        height="auto"
        paddingY="1"
        paddingX="2"
        marginLeft="auto"
        leftIcon={<SimulateIcon />}
        iconSpacing="1"
        onClick={onRequest}
      >
        Simulate
      </Button>
    </Flex>
  );
};
