import { Box, Flex, Link, List, ListItem, Text } from '@chakra-ui/react';
import { useState, type FunctionComponent } from 'react';

export type DocumentationProps = {
  methods: Queries.SnapMethods[];
};

export const Documentation: FunctionComponent<DocumentationProps> = ({
  methods,
}) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);
  const selectedMethod = methods[selectedMethodIndex];

  return (
    <Flex flexDirection="row" gap="4">
      <Box>
        <Text>onRpcRequest</Text>
        <List ml="4">
          {methods.map((method, index) => (
            <Link
              key={method.name}
              onClick={() => setSelectedMethodIndex(index)}
            >
              <ListItem>{method.name}</ListItem>
            </Link>
          ))}
        </List>
      </Box>

      <Box>
        <Text fontWeight="medium">{selectedMethod?.name}</Text>
        <Text>{selectedMethod?.description}</Text>
        <Text fontWeight="medium">Parameters</Text>
        <Box>
          {selectedMethod?.params?.members.map((member) => (
            <Text key={member?.name}>
              {member?.name} - {member?.type}
            </Text>
          ))}
        </Box>
        <Text fontWeight="medium">Returns</Text>
        <Text>{selectedMethod?.response?.description}</Text>
        <Text>{selectedMethod?.response?.type}</Text>
      </Box>
    </Flex>
  );
};
