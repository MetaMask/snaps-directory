import { Box, Heading, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DescriptionText } from './DescriptionText';
import type { Fields } from '../../../utils';

export type DescriptionProps = {
  name: string;
  description: Fields<Queries.SnapDescription, 'description' | 'trusted'>;
  allowLinks?: boolean;
};

export const Description: FunctionComponent<DescriptionProps> = ({
  name,
  description,
  allowLinks = description.trusted,
}) => (
  <Box flex="66.66%">
    <Heading
      as="h4"
      color="text.alternative"
      textTransform="uppercase"
      fontWeight="medium"
      fontSize="sm"
    >
      <Trans>
        Description by{' '}
        <Text
          as="span"
          color="text.default"
          textTransform="uppercase"
          fontWeight="medium"
          fontSize="sm"
        >
          {name}
        </Text>
      </Trans>
    </Heading>

    <DescriptionText
      description={description}
      allowLinks={allowLinks}
      whiteSpace="pre-wrap"
    />
  </Box>
);
