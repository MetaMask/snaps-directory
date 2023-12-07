import { Box, Tag } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { SNAP_CATEGORY_LABELS } from '../constants';
import type { RegistrySnapCategory } from '../constants';

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const SnapCategory: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => (
  <Box>
    <Tag textTransform="none">
      <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
    </Tag>
  </Box>
);
