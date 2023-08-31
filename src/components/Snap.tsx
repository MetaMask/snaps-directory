import { Flex, Text, Button, Avatar } from "@chakra-ui/react";
import React from "react";

export const Snap = ({ name, description, snapId, svgIcon, latestVersion }) => {
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
        <Avatar
          src={svgIcon}
          name={name.slice(0, 1).toUpperCase()}
          fontSize="md"
          background="background.alternative"
          color="text.alternative"
          size="sm"
          margin="1"
        />
        <Text
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="short"
          isTruncated
          verticalAlign="middle"
        >
          {name}
        </Text>
        <Text>{description}</Text>
        <Text>{latestVersion}</Text>
        <Button>Visit dapp</Button>
      </Flex>
    </Flex>
  );
};
