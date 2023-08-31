import { Box, Flex, Text, Button, Center } from "@chakra-ui/react";
import React from "react";

export const Snap = ({ metadata, snapId }) => {
  return (
    <Flex
      flexDirection="column"
      px="5"
      py="4"
      borderWidth="1px"
      rounded="md"
      boxShadow="base"
    >
      <Flex flexDirection="column">
        <Flex mb="2">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            lineHeight="short"
            isTruncated
            verticalAlign="middle"
          >
            {metadata.name}
          </Text>
        </Flex>
        <Button>Visit dapp</Button>
      </Flex>
    </Flex>
  );
};
