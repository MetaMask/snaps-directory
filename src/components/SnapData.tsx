import { Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type SnapDataProps = {
  label: string;
  value: ReactNode;
};

export const SnapData: FunctionComponent<SnapDataProps> = ({
  label,
  value,
}) => (
  <Flex
    flexDirection="column"
    minWidth={{ base: 'auto', md: '220px', lg: 'auto' }}
  >
    <Text color="gray.muted" fontFamily="custom" textTransform="uppercase">
      {label}
    </Text>
    {value}
  </Flex>
);
