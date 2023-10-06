import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { NotificationsButton, NotificationsList } from './components';

export const Notifications: FunctionComponent = () => (
  <Menu closeOnSelect={true} isLazy={true}>
    <MenuButton as={NotificationsButton} />
    <MenuList padding="2" borderRadius="2xl">
      <NotificationsList />
    </MenuList>
  </Menu>
);
