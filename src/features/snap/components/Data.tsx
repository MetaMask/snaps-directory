import { Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type SnapDataProps = {
  label: string;
  value: ReactNode;
};

export const Data: FunctionComponent<SnapDataProps> = ({ label, value }) => (
  <Flex flexDirection="column">
    <Text
      color="text.alternative"
      fontWeight="medium"
      fontSize="sm"
      textTransform="uppercase"
      marginBottom="1"
    >
      {label}
    </Text>
    {value}
  </Flex>
);
