import type { As, IconButtonProps, ComponentWithAs } from '@chakra-ui/react';
import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { getUnacknowledgedUpdates } from '../..';
import { DotIcon, NotificationsIcon } from '../../../components';
import { useSelector } from '../../../hooks';

export type NotificationsButtonProps = Partial<IconButtonProps>;

export const NotificationsButton: ComponentWithAs<
  As,
  NotificationsButtonProps
> = forwardRef((props, ref) => {
  const { _ } = useLingui();

  const hasUnacknowledgedUpdates =
    useSelector(getUnacknowledgedUpdates).length > 0;

  return (
    <IconButton
      ref={ref}
      {...props}
      position="relative"
      aria-label={_(t`Open notifications menu`)}
      variant="clear"
      icon={
        <>
          <NotificationsIcon
            fill="icon.alternative"
            cursor="pointer"
            width="2.25rem"
            height="2.25rem"
            sx={{
              '& > svg > rect': {
                fillOpacity: 1,
              },
              '& > svg > path': {
                fill: 'text.alternative',
              },
            }}
          />
          {hasUnacknowledgedUpdates && (
            <DotIcon position="absolute" top="0" right="0" />
          )}
        </>
      }
    />
  );
});
