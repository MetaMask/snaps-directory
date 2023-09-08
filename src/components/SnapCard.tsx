import { Flex, Text, Box } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapAuthorship } from './SnapAuthorship';
import type { Fields } from '../utils';

export const SnapCard: FunctionComponent<
  Fields<
    Queries.Snap,
    'name' | 'description' | 'snapId' | 'icon' | 'gatsbyPath'
  >
> = ({ name, description, snapId, icon, gatsbyPath }) => {
  return (
    <Link to={gatsbyPath}>
      <Flex
        flexDirection="column"
        px="5"
        py="4"
        rounded="2xl"
        boxShadow="base"
        backgroundColor="white"
        height="167px"
      >
        <Flex flexDirection="column">
          <Box marginBottom="4">
            <SnapAuthorship name={name} icon={icon} snapId={snapId} />
          </Box>
          <Text
            fontSize="sm"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};
