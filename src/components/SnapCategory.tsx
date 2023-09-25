import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { SNAP_CATEGORY_LABELS } from '../constants';
import type { RegistrySnapCategory } from '../features';

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const SnapCategory: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => (
  <Text>
    <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
  </Text>
);
