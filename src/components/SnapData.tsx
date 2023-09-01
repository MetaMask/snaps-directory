import { Flex, Text } from '@chakra-ui/react';

export const SnapData = ({ label, value }) => (
  <Flex flexDirection="column">
    <Text color="gray.muted" fontFamily="custom" textTransform="uppercase">
      {label}
    </Text>
    <Text>{value}</Text>
  </Flex>
);
