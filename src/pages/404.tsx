import { Container, Heading, Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { graphql, Link, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';

import banner from '../assets/images/seo/home.png';
import { Fox } from '../components';
import type { Fields } from '../utils';

const NotFoundPage: FunctionComponent = () => (
  <Container
    display="flex"
    flexDirection="column"
    marginY="12"
    alignItems="center"
    textAlign="center"
    maxWidth="container.md"
  >
    <Fox />
    <Heading
      as="h1"
      fontSize={['2xl', '4xl', '5xl']}
      marginY="6"
      lineHeight="116%"
    >
      <Trans>The page you&apos;re looking for can&apos;t be found.</Trans>
    </Heading>
    <Link to="/">
      <Button variant="primary">
        <Trans>Go home</Trans>
      </Button>
    </Link>
  </Container>
);

type HeadProps = {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author' | 'siteUrl'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const title = `Page not found - ${data.site.siteMetadata.title}`;
  const image = `${data.site.siteMetadata.siteUrl}${withPrefix(banner)}`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
      <meta property="og:title" content="Page not found" />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta
        property="og:description"
        content={data.site.siteMetadata.description}
      />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={data.site.siteMetadata.description}
      />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;

export default NotFoundPage;
