import { Button, Stack, forwardRef } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Icon } from './Icon';

export type FilterButtonProps = {
  children: ReactNode;
};

export const FilterButton: FunctionComponent<FilterButtonProps> = forwardRef<
  FilterButtonProps,
  'button'
>((props, ref) => (
  <Button
    ref={ref}
    {...props}
    variant="primary"
    padding="0.5"
    height="auto"
    background="white"
    borderRadius="full"
    rightIcon={<Icon icon="dropdown" width="16px" />}
    flexShrink="0"
    sx={{
      '.chakra-button__icon': {
        margin: '0',
        marginX: '1',
      },
    }}
  >
    <Stack
      direction="row"
      gap="0"
      sx={{
        '& > *': {
          borderRadius: 'full',
          ':not(:first-of-type)': {
            marginLeft: '-16px',
          },
        },
      }}
    >
      <Icon icon="transactionInsightsOutline" width="34px" />
      <Icon icon="interoperabilityOutline" width="34px" />
      <Icon icon="notificationsOutline" width="34px" />
    </Stack>
  </Button>
));
