import type { ResponsiveValue } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type SnapDataProps = {
  label: string;
  value: ReactNode;
  order: ResponsiveValue<number>;
};

export const SnapData: FunctionComponent<SnapDataProps> = ({
  label,
  value,
  order,
}) => (
  <Flex
    order={order}
    flexDirection="column"
    minWidth={{ base: 'auto', md: '13.75rem', lg: 'auto' }}
  >
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
