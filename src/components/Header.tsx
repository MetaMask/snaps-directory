import type { BoxProps } from '@chakra-ui/react';
import { Button, Box, Container, Stack } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ColorModeToggle } from './ColorModeToggle';
import { GlobeIcon } from './icons';
import { Logo } from './Logo';
import { FilterSearch, Notifications } from '../features';

type HeaderProps = BoxProps;

export const Header: FunctionComponent<HeaderProps> = (props) => (
  <Box
    {...props}
    as="header"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    background="background.header"
    backdropFilter="auto"
    backdropBlur="1.25rem"
    backdropSaturate="180%"
    position="fixed"
    top="0"
    left="0"
    width="100%"
    zIndex="sticky"
  >
    <Container maxWidth="100%">
      <Stack
        direction="row"
        alignItems="center"
        gap="3"
        justifyContent="space-between"
      >
        <Link to="/">
          <Stack direction="row" alignItems="center" gap="2">
            <Logo />
          </Stack>
        </Link>
        <Stack direction="row" gap="4">
          <GlobeIcon flexShrink="0" />
          <ColorModeToggle />
          <FilterSearch />
          <Notifications />
          <Button flexShrink="0" variant="primary">
            Download
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
