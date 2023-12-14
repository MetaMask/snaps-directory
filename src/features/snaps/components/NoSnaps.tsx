import { Button, Center, Heading, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Fox } from '../../../components';
import { useDispatch } from '../../../hooks';
import { filterAll, resetSearch } from '../../filter';

export const NoSnaps: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(filterAll());
    dispatch(resetSearch());
  };

  return (
    <Center
      flexDirection="column"
      paddingY="6rem"
      borderRadius="3xl"
      data-testid="no-snaps"
    >
      <Center flexDirection="column" gap="4" maxWidth="19.375rem">
        <Fox />
        <Heading as="h3" fontSize="2xl" color="text.alternative">
          <Trans>No Snaps found</Trans>
        </Heading>
        <Text fontSize="md" color="text.alternative" textAlign="center">
          <Trans>
            Adjust your search or display all available Snaps by clicking below.
          </Trans>
        </Text>
        <Button variant="primary" onClick={handleClick}>
          <Trans>See everything</Trans>
        </Button>
      </Center>
    </Center>
  );
};
