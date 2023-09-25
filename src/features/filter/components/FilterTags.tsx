import type { StackProps } from '@chakra-ui/react';
import { Stack, Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { FilterTag } from './FilterTag';
import { CloseIcon } from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { getCategories, getInstalled, toggleInstalled } from '../store';

export type FilterTagsProps = StackProps;

export const FilterTags: FunctionComponent<FilterTagsProps> = (props) => {
  const dispatch = useDispatch();
  const installed = useSelector(getInstalled);
  const categories = useSelector(getCategories);

  const handleClickInstalled = () => {
    dispatch(toggleInstalled());
  };

  return (
    <Stack direction="row" spacing={2} {...props}>
      {categories.map((category) => (
        <FilterTag key={category} category={category} />
      ))}
      {installed && (
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
