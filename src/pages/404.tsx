import { Text, Box, Container, Center, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';

const NotFoundPage = () => {
  return (
    <Box p="8" textAlign="center">
      <Container>
        <Center>
          <Heading m="2" as="h1" size="2xl">
            404
          </Heading>
        </Center>
        <Text mt="4" opacity="0.75">
          <Trans>These are not the droids you are looking for.</Trans>
        </Text>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
