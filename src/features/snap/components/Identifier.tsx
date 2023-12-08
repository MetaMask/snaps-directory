import { Box, Tag } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';

export type IdentifierProps = {
  snapId: string;
  website: string;
};

export const Identifier: FunctionComponent<IdentifierProps> = ({
  snapId,
  website,
}) => (
  <Box>
    <Tag variant="muted" textTransform="none">
      <ExternalLink href={website} color="inherit">
        {snapId.replace(/^npm:/u, '')}
      </ExternalLink>
    </Tag>
  </Box>
);
