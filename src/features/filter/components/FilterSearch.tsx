import {
  Box,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { navigate } from 'gatsby';
import type { FunctionComponent, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { FilterSearchInput } from './FilterSearchInput';
import { useDispatch, useSearchResults, useSelector } from '../../../hooks';
import { getSnapsById } from '../../snaps';
import { SnapCard } from '../../snaps/components';
import { setSearchQuery, setSearchResults } from '../store';

export const FilterSearch: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const results = useSearchResults(query);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const snaps = useSelector(
    getSnapsById(results.map((result) => result.snapId)),
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleAll = () => {
    dispatch(setSearchQuery(query));
    dispatch(setSearchResults(results));
    onClose();

    // According to the type definition, `navigate` returns a promise, but in
    // practice it does not.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/explore', { replace: true });
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
            onClick={handleAll}
          >
            <Trans>See all results</Trans>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};
