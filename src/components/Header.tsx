import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Stack } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Logo } from './Logo';

type HeaderProps = BoxProps;

export const Header: FunctionComponent<HeaderProps> = (props) => (
  <Box
    {...props}
    as="header"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    background="white"
    marginBottom="20"
  >
    <Container maxWidth="7xl">
      <Stack direction="row" height="7" align="center">
        <Link to="/">
          <Logo />
        </Link>
      </Stack>
    </Container>
  </Box>
);
