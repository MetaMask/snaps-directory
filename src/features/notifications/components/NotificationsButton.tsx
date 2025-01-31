import type { As, IconButtonProps, ComponentWithAs } from '@chakra-ui/react';
import { forwardRef, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { getUnacknowledgedUpdates } from '../..';
import { BellIcon, DotIcon } from '../../../components';
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
      variant="outline"
      icon={
        <>
          <BellIcon width="0.638rem" height="0.75rem" />
          {hasUnacknowledgedUpdates && (
            <DotIcon position="absolute" top="0" right="0" />
          )}
        </>
      }
    />
  );
});
