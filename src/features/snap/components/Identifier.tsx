import { Box, Tag } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';

export type IdentifierProps = {
  snapId: string;
};

const NPM_URL = 'https://npmjs.com/package/';

export const Identifier: FunctionComponent<IdentifierProps> = ({ snapId }) => {
  const id = snapId.replace(/^npm:/u, '');
  const url = `${NPM_URL}${id}`;

  return (
    <Box>
      <Tag variant="muted" textTransform="none">
        <ExternalLink href={url} color="inherit">
          {id}
        </ExternalLink>
      </Tag>
    </Box>
  );
};
