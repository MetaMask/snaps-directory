import {
  Link,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { navigate } from 'gatsby';
import type { ChangeEvent, FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import { FilterSearchInput } from './FilterSearchInput';
import { useDispatch, useSearchResults, useSelector } from '../../../hooks';
import { getSnapsById } from '../../snaps';
import { SnapCard } from '../../snaps/components';
import { Order } from '../constants';
import { setOrder, setSearchQuery, setSearchResults } from '../store';

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

  const handleClick = () => {
    if (query && snaps.length > 0) {
      onOpen();
    }
  };

  const handleAll = () => {
    dispatch(setSearchQuery(query));
    dispatch(setSearchResults(results));
    dispatch(setOrder(Order.Search));
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
    <Menu isLazy={true} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton
        as={FilterSearchInput}
        query={query}
        onFormChange={handleChange}
        onFormClick={handleClick}
        onFormSubmit={handleAll}
      />
      <MenuList maxWidth="23.875rem" padding="1" boxShadow="xl">
        {snaps.slice(0, 5).map((snap) => (
          <SnapCard key={`${snap.snapId}`} {...snap} onClick={onClose} />
        ))}
        <Link
          href="#"
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
  );
};
