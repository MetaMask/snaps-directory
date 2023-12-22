import {
  Box,
  Button,
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
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useState, type FunctionComponent, useEffect } from 'react';

import { Simulation } from './Simulation';
import { InfoIcon } from '../../../components';
import type { Fields } from '../../../utils';
import { parseDeclarationSourceCode } from '../../../utils/documentation';

export type DocumentationProps = {
  snapId: string;
  methods: Fields<
    Queries.SnapMethods,
    'name' | 'params' | 'description' | 'response'
  >[];
};

export const Documentation: FunctionComponent<DocumentationProps> = ({
  snapId,
  methods: initialMethods,
}) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);
  const [enableSimulation, setEnableSimulation] = useState(false);

  const [methods, setMethods] = useState(initialMethods);

  useEffect(() => {
    const id = setInterval(() => {
      /**
       * Fetches the latest Snap declaration file and parses it.
       * @returns The parsed methods available in the declaration file.
       */
      async function getMethods() {
        const response = await fetch('http://localhost:8080/snap.d.ts');
        const sourceCode = await response.text();

        return parseDeclarationSourceCode(sourceCode);
      }

      getMethods()
        .then((newMethods) => setMethods(newMethods))
        .catch((error) => console.error(error));
    }, 2000);

    return () => clearInterval(id);
  }, []);

  const selectedMethod = methods[selectedMethodIndex];
  if (!selectedMethod) {
    return null;
  }

  const handleNavigate = (index: number) => {
    setEnableSimulation(false);
    setSelectedMethodIndex(index);
  };

  const handleEnableSimulation = () => {
    setEnableSimulation((previousState) => !previousState);
  };

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
              {/* TODO: Don't use arrow function in props. */}
              <Link onClick={() => handleNavigate(index)}>
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

      <Flex flexDirection="column" gap="12" flex="1">
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
                {selectedMethod?.params?.members?.map((member) => (
                  <Tr key={member?.name}>
                    <Td>
                      <Tag variant="documentation" mr="1">
                        {member?.name}
                        {member?.optional && '?'}
                      </Tag>
                      :
                      <Tag variant="documentation" ml="1">
                        {member?.type}
                      </Tag>
                    </Td>
                    <Td whiteSpace="normal">{member?.description}</Td>
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
          <Flex flexDirection="row" gap="2">
            <Tag variant="documentation" color="info.default">
              {selectedMethod?.response?.type}
            </Tag>
            {!enableSimulation && (
              <Button variant="small" onClick={handleEnableSimulation}>
                Simulate
              </Button>
            )}
          </Flex>
        </Box>
        {enableSimulation && (
          <Box>
            <Flex alignItems="middle" marginBottom="2" gap="1">
              <Text
                color="text.muted"
                fontWeight="medium"
                fontSize="sm"
                textTransform="uppercase"
              >
                Simulation
              </Text>
              <Tooltip label="Enter values to simulate a return value.">
                <InfoIcon />
              </Tooltip>
            </Flex>
            <Simulation snapId={snapId} method={selectedMethod} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
