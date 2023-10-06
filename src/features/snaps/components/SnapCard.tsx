import { Flex, Text, Box } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Card, SnapAuthorship } from '../../../components';
import type { Fields } from '../../../utils';

export const SnapCard: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'summary' | 'snapId' | 'icon' | 'gatsbyPath'>
> = ({ name, summary, snapId, icon, gatsbyPath }) => {
  return (
    <Link to={gatsbyPath}>
      <Card>
        <Flex flexDirection="column">
          <Box marginBottom="4">
            <SnapAuthorship name={name} icon={icon} snapId={snapId} />
          </Box>
          <Text
            fontSize="sm"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {summary}
          </Text>
        </Flex>
      </Card>
    </Link>
  );
};
