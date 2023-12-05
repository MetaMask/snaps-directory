import {
  Box,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { FilterSearchInput } from './FilterSearchInput';
import { useSearchResults, useSelector } from '../../../hooks';
import { getSnapsById } from '../../snaps';
import { SnapCard } from '../../snaps/components';

export const FilterSearch: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const results = useSearchResults(query);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const snaps = useSelector(
    getSnapsById(results.map((result) => result.snapId)),
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (snaps.length > 0) {
      return onOpen();
    }

    return onClose();
  }, [snaps.length, query, onOpen, onClose]);

  return (
    <Box>
      <Menu isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
        <MenuButton
          as={FilterSearchInput}
          query={query}
          onFormChange={handleChange}
        />
        <MenuList
          background="background.alternative"
          maxWidth="23.875rem"
          padding="1"
          boxShadow="xl"
        >
          {snaps.slice(0, 5).map((snap) => (
            <SnapCard key={`${snap.snapId}`} {...snap} onClick={onClose} />
          ))}
          <Link
            display="block"
            fontSize="md"
            fontWeight="500"
            textAlign="center"
            paddingY="4"
          >
            <Trans>See all results</Trans>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};
