import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Stack, Tag } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
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
  >
    <Container maxWidth="7xl">
      <Link to="/">
        <Stack direction="row" alignItems="center" gap="2">
          <Logo />
          <Tag
            fontSize="0.65rem"
            color="gray.muted"
            background="background.alternative"
          >
            <Trans>Open Beta</Trans>
          </Tag>
        </Stack>
      </Link>
    </Container>
  </Box>
);
