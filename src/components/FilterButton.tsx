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
    padding="0"
    height="auto"
    background="white"
    borderRadius="full"
    rightIcon={<Icon icon="dropdown" width="16px" />}
    flexShrink="0"
    sx={{
      '.chakra-button__icon': {
        margin: '0',
        marginRight: '1',
      },
    }}
  >
    <Stack
      direction="row"
      gap="0"
      sx={{
        '& > *': {
          borderRadius: 'full',
          border: '3px solid',
          borderColor: 'white',
          ':not(:first-of-type)': {
            marginLeft: '-16px',
          },
        },
      }}
    >
      <Icon icon="transactionInsights" width="32px" />
      <Icon icon="interoperability" width="32px" />
      <Icon icon="notifications" width="32px" />
    </Stack>
  </Button>
));
