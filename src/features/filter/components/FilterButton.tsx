import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { FilterIcon } from '../../../components';

export type FilterButtonProps = {
  children?: ReactNode;
};

export const FilterButton: FunctionComponent<FilterButtonProps> = forwardRef<
  FilterButtonProps,
  'button'
>((props, ref) => {
  const { _ } = useLingui();

  return (
    <IconButton
      ref={ref}
      data-testid="filter-button"
      {...props}
      variant="filter"
      isRound={true}
      aria-label={_(t`Open filter menu`)}
      height="auto"
      icon={<FilterIcon width="1.25rem" />}
      flexShrink="0"
    />
  );
});
