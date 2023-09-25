import { Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { CloseIcon } from '../../../components';
import { SNAP_CATEGORY_LABELS } from '../../../constants';
import { useDispatch } from '../../../hooks';
import type { RegistrySnapCategory } from '../store';
import { toggleCategory } from '../store';

export type FilterTagProps = {
  category: RegistrySnapCategory;
};

export const FilterTag: FunctionComponent<FilterTagProps> = ({ category }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCategory(category));
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
