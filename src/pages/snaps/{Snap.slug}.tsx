import { Box, Button, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapAuthorship, Icon, SnapData } from '../../components';
import type { Fields } from '../../utils';

type SnapPageProps = {
  data: {
    snap: Fields<
      Queries.Snap,
      'name' | 'svgIcon' | 'snapId' | 'description' | 'latestVersion'
    >;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => {
  const { name, snapId, svgIcon, description, latestVersion } = data.snap;

  return (
    <Container maxWidth="container.lg">
      <Box p="6" rounded="2xl" boxShadow="base" background="white">
        <Flex justifyContent="space-between">
          <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
          <Flex alignItems="center">
            <Button
              variant="outline"
              leftIcon={<Icon icon="externalLink" />}
              mr="2"
            >
              Website
            </Button>
            <Button variant="primary">Install {name}</Button>
          </Flex>
        </Flex>
        <Divider my="6" />
        <Flex justifyContent="space-between">
          <SnapData label="Developer" value="Foo" />
          <SnapData label="Category" value="Foo" />
          <SnapData label="Source Code" value="Foo" />
          <SnapData label="Version" value={latestVersion} />
          <SnapData label="Audit" value="Foo" />
        </Flex>
        <Divider my="6" />
        <Text color="gray.muted" fontFamily="custom" textTransform="uppercase">
          Description by{' '}
          <Text
            as="span"
            color="black"
            fontFamily="custom"
            textTransform="uppercase"
          >
            {name}
          </Text>
        </Text>
        <Text mt="1">{description}</Text>
      </Box>
    </Container>
  );
};

export const query = graphql`
  query ($id: String) {
    snap(id: { eq: $id }) {
      name
      snapId
      svgIcon
      description
      latestVersion
    }
  }
`;

export default SnapPage;
