import { Box, Button, Flex } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SimulateIcon } from '../../../components';

export const Simulation: FunctionComponent = () => (
  <Flex
    flex="1"
    background="background.alternative"
    borderRadius="4"
    paddingX="2"
    paddingY="1"
    paddingBottom="2"
    flexDirection="column"
  >
    <Box minHeight="5rem" fontFamily="code">
      Return value
    </Box>
    <Button
      variant="primary"
      height="auto"
      paddingY="1"
      paddingX="2"
      marginLeft="auto"
      leftIcon={<SimulateIcon />}
      iconSpacing="1"
    >
      Simulate
    </Button>
  </Flex>
);
