import { Container, Stack } from '@chakra-ui/react';
import { Link } from 'gatsby';
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
    background="white"
    marginBottom="20"
  >
    <Stack direction="row" height="7" align="center">
      <Link to="/">
        <Logo />
      </Link>
    </Stack>
  </Container>
);
