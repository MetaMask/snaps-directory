import {
  Box,
  Flex,
  Link,
  List,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
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
    <Flex flexDirection="row" gap="12">
      <Box>
        <Text
          color="text.muted"
          fontWeight="medium"
          fontSize="sm"
          textTransform="uppercase"
          marginBottom="1"
        >
          Method
        </Text>
        <List>
          {methods.map((method, index) => (
            <Box key={method.name} mb="2">
              <Link onClick={() => setSelectedMethodIndex(index)}>
                <Tag
                  variant="documentation"
                  bg={selectedMethodIndex === index ? undefined : 'none'}
                  color={
                    selectedMethodIndex === index ? undefined : 'icon.muted'
                  }
                >
                  {method.name}
                </Tag>
              </Link>
            </Box>
          ))}
        </List>
      </Box>

      <Box width="1px" background="border.muted"></Box>

      <Flex flexDirection="column" gap="12">
        <Box>
          <Text
            color="text.muted"
            fontWeight="medium"
            fontSize="sm"
            textTransform="uppercase"
            marginBottom="1"
          >
            Method Description
          </Text>
          <Text>{selectedMethod?.description}</Text>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Parameter</Th>
                  <Th>Parameter Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedMethod?.params?.members.map((member) => (
                  <Tr key={member?.name}>
                    <Td>
                      <Tag variant="documentation" mr="1">
                        {member?.name}
                      </Tag>
                      :
                      <Tag variant="documentation" ml="1">
                        {member?.type}
                      </Tag>
                    </Td>
                    <Td whiteSpace="normal">
                      Lorem ipsum super long parameter description that might
                      even be long enough to break the line a little bit
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Text
            color="text.muted"
            fontWeight="medium"
            fontSize="sm"
            textTransform="uppercase"
            marginBottom="1"
          >
            Return Value
          </Text>
          <Tag variant="documentation" color="info.default">
            {selectedMethod?.response?.type}
          </Tag>
        </Box>
      </Flex>
    </Flex>
  );
};
