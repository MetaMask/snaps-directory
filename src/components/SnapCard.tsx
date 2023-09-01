import { Flex, Text, Box } from '@chakra-ui/react';
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
  const shortDescription =
    description.length > 115 ? `${description.slice(0, 115)}...` : description;

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
        <Box marginBottom="4">
          <Link to={gatsbyPath}>
            <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
          </Link>
        </Box>
        <Text fontSize="sm">{shortDescription}</Text>
      </Flex>
    </Flex>
  );
};
