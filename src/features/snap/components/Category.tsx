import { Box, Tag } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import type { RegistrySnapCategory } from '../../../constants';
import { SNAP_CATEGORY_LINKS, SNAP_CATEGORY_LABELS } from '../../../constants';

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const Category: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => (
  <Box>
    <Link to={SNAP_CATEGORY_LINKS[category].link}>
      <Tag textTransform="none">
        <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
      </Tag>
    </Link>
  </Box>
);
