import { Container, Heading, Button } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Link, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';

import banner from '../assets/images/seo/home.png';
import { Fox, SEO } from '../components';

export type NotFoundPageProps = {
  pageContext: {
    locale: string;
  };
};

const Head: FunctionComponent<NotFoundPageProps> = ({ pageContext }) => {
  const { _ } = useLingui();

  const title = _(t`Page not found on the MetaMask Snaps Directory`);
  const ogTitle = _(t`Page not found`);

  return (
    <SEO
      locale={pageContext.locale}
      title={title}
      ogTitle={ogTitle}
      banner={withPrefix(banner)}
    />
  );
};

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  pageContext,
}) => (
  <Container
    display="flex"
    flexDirection="column"
    marginY="12"
    alignItems="center"
    textAlign="center"
    maxWidth="container.md"
  >
    <Head pageContext={pageContext} />
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

export default NotFoundPage;
