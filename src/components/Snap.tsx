import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './SnapIcon';
import type { Fields } from '../utils';

export const Snap: FunctionComponent<
  Fields<
    Queries.Snap,
    | 'name'
    | 'description'
    | 'snapId'
    | 'svgIcon'
    | 'latestVersion'
    | 'gatsbyPath'
  >
> = ({ name, description, snapId, svgIcon, latestVersion, gatsbyPath }) => {
  return (
    <Flex flexDirection="column" px="5" py="4" rounded="2xl" boxShadow="base">
      <Flex flexDirection="column">
        <Flex mb="2">
          <SnapIcon snapName={name} svgIcon={svgIcon} />
          <Flex ml="2" flexDirection="column">
            <Text fontWeight="semibold" isTruncated>
              {name}
            </Text>
            <Text isTruncated>{snapId.slice(4)}</Text>
          </Flex>
        </Flex>
        <Text>{description}</Text>
        <Text>{latestVersion}</Text>
        <Button>Visit dapp</Button>
        <Link to={gatsbyPath}>
          <Button>Snap page</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
