import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent, ReactNode } from 'react';

import { Icon } from '../../../components';

export type FilterButtonProps = {
  children: ReactNode;
};

export const FilterButton: FunctionComponent<FilterButtonProps> = forwardRef<
  FilterButtonProps,
  'button'
>((props, ref) => (
  <IconButton
    ref={ref}
    {...props}
    variant="shadow"
    isRound={true}
    aria-label={t`Filter`}
    height="auto"
    icon={<Icon icon="filter" width="20px" />}
    flexShrink="0"
  />
));
