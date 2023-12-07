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

  // These props cannot be called `on[...]` because it will conflict with the
  // `on[...]` props from Chakra's `MenuButton` component.
  onFormClick: () => void;
  onFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: () => void;
};

export const FilterSearchInput: FunctionComponent<FilterSearchInputProps> =
  // This component must be a forwardRef because it is used as the `as` prop of
  // `MenuButton`. The `MenuButton` component will pass a ref to this component
  // so that it can be used to position the menu.
  forwardRef(({ query, onFormClick, onFormChange, onFormSubmit }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onFormSubmit();
      }
    };

    return (
      <InputGroup background="background.default" borderRadius="full" ref={ref}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon width="1.25rem" color="green" />
        </InputLeftElement>
        <Input
          type="search"
          borderRadius="full"
          placeholder={t`Search Snaps`}
          value={query}
          onChange={onFormChange}
          onClick={onFormClick}
          onKeyDown={handleKeyDown}
          border="none"
          background="background.alternative"
          _focusVisible={{
            border: 'none',
            outline: 'none',
          }}
        />
      </InputGroup>
    );
  });
