import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Stack, Tag } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ColorModeToggle } from './ColorModeToggle';
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
    <Container maxWidth="7xl">
      <Stack
        direction="row"
        alignItems="center"
        gap="3"
        justifyContent="space-between"
      >
        <Link to="/">
          <Stack direction="row" alignItems="center" gap="2">
            <Logo />
            <Tag
              variant="muted"
              fontSize="0.65rem"
              display={{ base: 'none', md: 'flex' }}
            >
              <Trans>Open Beta</Trans>
            </Tag>
          </Stack>
        </Link>
        <Stack direction="row" gap="2">
          <FilterSearch />
          <ColorModeToggle />
          <Notifications />
        </Stack>
      </Stack>
    </Container>
  </Box>
);
