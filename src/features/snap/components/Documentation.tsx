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
import { useState, type FunctionComponent } from 'react';

import { Simulation } from './Simulation';
import { SimulationInputs } from './SimulationInputs';
import { InfoIcon } from '../../../components';
import type { Fields } from '../../../utils';

export type DocumentationProps = {
  methods: Fields<
    Queries.SnapMethods,
    'name' | 'params' | 'description' | 'response'
  >[];
};

export const Documentation: FunctionComponent<DocumentationProps> = ({
  methods,
}) => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);
  const [enableSimulation, setEnableSimulation] = useState(false);

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
            <Flex gap="2">
              <SimulationInputs method={selectedMethod} />
              <Simulation />
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
