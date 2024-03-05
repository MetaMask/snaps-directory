import { Flex, Link, useDisclosure } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { Category } from './Category';
import { Data } from './Data';
import { MetadataItems } from './MetadataItems';
import { MetadataModal } from './MetadataModal';
import { ExternalLink } from '../../../components';
import type { RegistrySnapCategory } from '../../../constants';
import { type Fields, getLinkText } from '../../../utils';

export type MetadataProps = {
  snap: Fields<
    Queries.Snap,
    | 'name'
    | 'icon'
    | 'snapId'
    | 'description'
    | 'latestVersion'
    | 'website'
    | 'onboard'
    | 'category'
    | 'author'
    | 'sourceCode'
    | 'additionalSourceCode'
    | 'audits'
    | 'banner'
    | 'support'
    | 'privateCode'
    | 'privacyPolicy'
    | 'termsOfUse'
  >;
};

export const Metadata: FunctionComponent<MetadataProps> = ({ snap }) => {
  const { _ } = useLingui();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { category, support } = snap;

  return (
    <Flex marginBottom="8" gap="4" justifyContent="space-between">
      <MetadataModal snap={snap} isOpen={isOpen} onClose={onClose} />
      <Flex
        gap={['6', null, null, '16']}
        flexDirection={['column', null, null, 'row']}
      >
        {category && (
          <Data
            label={_(t`Category`)}
            value={<Category category={category as RegistrySnapCategory} />}
          />
        )}

        <MetadataItems snap={snap} />

        {(support?.contact || support?.faq || support?.knowledgeBase) && (
          <Data
            label={_(t`Support`)}
            value={
              <>
                {support.contact && (
                  <ExternalLink href={support.contact}>
                    {getLinkText(support.contact, _(t`Contact`))}
                  </ExternalLink>
                )}
                {support.faq && (
                  <ExternalLink href={support.faq}>
                    <Trans>FAQ</Trans>
                  </ExternalLink>
                )}
                {support.knowledgeBase && (
                  <ExternalLink href={support.knowledgeBase}>
                    <Trans>Knowledge Base</Trans>
                  </ExternalLink>
                )}
                {support.keyRecovery && (
                  <ExternalLink href={support.keyRecovery}>
                    <Trans>Key Recovery</Trans>
                  </ExternalLink>
                )}
              </>
            }
          />
        )}
      </Flex>
      <Link fontWeight="500" onClick={onOpen}>
        <Trans>See Details</Trans>
      </Link>
    </Flex>
  );
};
