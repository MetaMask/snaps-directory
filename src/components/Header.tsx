import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Stack, Tag } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ColorModeToggle } from './ColorModeToggle';
import { Logo } from './Logo';

type HeaderProps = BoxProps;

export const Header: FunctionComponent<HeaderProps> = (props) => (
  <Box
    {...props}
    as="header"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    background="background.header"
  >
    <Container maxWidth="7xl">
      <Stack direction="row" alignItems="center" gap="2">
        <Link to="/">
          <Stack direction="row" alignItems="center" gap="2">
            <Logo />
            <Tag variant="muted" fontSize="0.65rem">
              <Trans>Open Beta</Trans>
            </Tag>
          </Stack>
        </Link>
        <ColorModeToggle />
      </Stack>
    </Container>
  </Box>
);
