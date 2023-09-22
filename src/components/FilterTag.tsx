import { Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { CloseIcon } from './CloseIcon';
import { UNSELECT_CATEGORY, useFilter } from '../hooks';
import type { RegistrySnapCategory } from '../state';
import { SNAP_CATEGORY_LABELS } from '../state';

export type FilterTagProps = {
  category: RegistrySnapCategory;
};

export const FilterTag: FunctionComponent<FilterTagProps> = ({ category }) => {
  const [, dispatch] = useFilter();

  const handleClick = () => {
    dispatch({
      type: UNSELECT_CATEGORY,
      payload: category,
    });
  };

  return (
    <Tag variant="category">
      <TagLabel>
        <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
      </TagLabel>
      <CloseIcon onClick={handleClick} />
    </Tag>
  );
};
