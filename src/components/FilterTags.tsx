import { Stack, Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { CloseIcon } from './CloseIcon';
import { FilterMenu } from './FilterMenu';
import { FilterTag } from './FilterTag';
import { UNSELECT_INSTALLED, useFilter } from '../hooks';

export const FilterTags: FunctionComponent = () => {
  const [state, dispatch] = useFilter();

  const handleClickInstalled = () => {
    dispatch({
      type: UNSELECT_INSTALLED,
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <FilterMenu />
      {state.categories.map((category) => (
        <FilterTag key={category} category={category} />
      ))}
      {state.installed && (
        <Tag
          variant="category"
          background="success.muted"
          color="success.default"
        >
          <TagLabel>
            <Trans>Installed</Trans>
          </TagLabel>
          <CloseIcon onClick={handleClickInstalled} />
        </Tag>
      )}
    </Stack>
  );
};
