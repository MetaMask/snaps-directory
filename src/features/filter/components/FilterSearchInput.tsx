import {
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { ChangeEvent, FunctionComponent } from 'react';

import { SearchIcon } from '../../../components';

export type FilterSearchInputProps = {
  query: string;

  // This prop cannot be called `onChange` because it will conflict with the
  // `onChange` prop from Chakra's `MenuButton` component.
  onFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FilterSearchInput: FunctionComponent<FilterSearchInputProps> =
  // This component must be a forwardRef because it is used as the `as` prop of
  // `MenuButton`. The `MenuButton` component will pass a ref to this component
  // so that it can be used to position the menu.
  forwardRef(({ query, onFormChange }, ref) => (
    <InputGroup background="background.card" borderRadius="full" ref={ref}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon width="1.25rem" color="green" />
      </InputLeftElement>
      <Input
        type="search"
        borderRadius="full"
        placeholder={t`Search Snaps`}
        value={query}
        onChange={onFormChange}
        border="none"
        background="background.alternative"
        _focusVisible={{
          border: 'none',
          outline: 'none',
        }}
      />
    </InputGroup>
  ));
