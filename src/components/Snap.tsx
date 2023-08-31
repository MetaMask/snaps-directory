import { Flex, Text, Button, Avatar } from "@chakra-ui/react";
import React from "react";
import { SnapIcon } from "./SnapIcon";

export const Snap = ({ name, description, snapId, svgIcon, latestVersion }) => {
  return (
    <Flex flexDirection="column" px="5" py="4" rounded="2xl" boxShadow="base">
      <Flex flexDirection="column">
        <Flex mb="2">
          <SnapIcon snapName={name} svgIcon={svgIcon} />
          <Flex ml="2" flexDirection="column">
            <Text fontWeight="semibold" isTruncated>
              {name}
            </Text>
            <Text isTruncated>
              {snapId.slice(4)}
            </Text>
          </Flex>
        </Flex>
        <Text>{description}</Text>
        <Text>{latestVersion}</Text>
        <Button>Visit dapp</Button>
      </Flex>
    </Flex>
  );
};
