import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapAuthorship } from './SnapAuthorship';
import type { Fields } from '../utils';

export const SnapCard: FunctionComponent<
  Fields<
    Queries.Snap,
    'name' | 'description' | 'snapId' | 'svgIcon' | 'gatsbyPath'
  >
> = ({ name, description, snapId, svgIcon, gatsbyPath }) => {
  return (
    <Flex
      flexDirection="column"
      px="5"
      py="4"
      rounded="2xl"
      boxShadow="base"
      backgroundColor="white"
    >
      <Flex flexDirection="column">
        <Flex mb="2">
          <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
        </Flex>
        <Text>{description}</Text>
        <Link to={gatsbyPath}>
          <Button>Snap page</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
