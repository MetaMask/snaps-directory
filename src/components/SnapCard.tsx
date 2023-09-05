import { Flex, Text, Box } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapAuthorship } from './SnapAuthorship';
import type { Fields } from '../utils';

/**
 * Normalize the description to ensure it ends with a period. This also replaces
 * "Metamask" with "MetaMask".
 *
 * @param description - The description to normalize.
 * @returns The normalized description.
 */
function normalizeDescription(description: string) {
  let normalizedDescription = description.trim();
  if (!description.endsWith('.') && !description.endsWith('!')) {
    normalizedDescription = `${description}.`;
  }

  return normalizedDescription.replace(/Metamask/gu, 'MetaMask');
}

export const SnapCard: FunctionComponent<
  Fields<
    Queries.Snap,
    'name' | 'description' | 'snapId' | 'svgIcon' | 'gatsbyPath'
  >
> = ({ name, description, snapId, svgIcon, gatsbyPath }) => {
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
            <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
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
            {normalizeDescription(description)}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};
