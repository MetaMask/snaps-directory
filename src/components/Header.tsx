import { Container, Stack } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Logo } from './Logo';

export const Header: FunctionComponent = () => (
  <Container
    as="header"
    size="fullWidth"
    borderBottom="muted"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
  >
    <Stack direction="row" height="7" align="center">
      <Logo />
    </Stack>
  </Container>
);
