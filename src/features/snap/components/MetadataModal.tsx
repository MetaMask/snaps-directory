import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { Audits } from './Audits';
import { Data } from './Data';
import { Legal } from './Legal';
import { MetadataItems } from './MetadataItems';
import { SourceCode } from './SourceCode';
import { InstallationCount } from '../../../components';
import type { Fields } from '../../../utils';

export type MetadataModalProps = {
  snap: Fields<
    Queries.Snap,
    | 'snapId'
    | 'name'
    | 'audits'
    | 'author'
    | 'latestVersion'
    | 'sourceCode'
    | 'additionalSourceCode'
    | 'website'
    | 'privateCode'
    | 'privacyPolicy'
    | 'termsOfUse'
    | 'installs'
  >;
  isOpen: boolean;
  onClose: () => void;
};

export const MetadataModal: FunctionComponent<MetadataModalProps> = ({
  snap,
  isOpen,
  onClose,
}) => {
  const { _ } = useLingui();
  const {
    name,
    author,
    audits,
    latestVersion,
    sourceCode,
    additionalSourceCode,
    privateCode,
    privacyPolicy,
    termsOfUse,
    installs,
  } = snap;

  return (
    <Modal
      variant="minimal"
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap="4">
          <MetadataItems snap={snap} />

          <Data label={_(t`Version`)} value={<Text>{latestVersion}</Text>} />
          <Data
            label={_(t`Installs`)}
            value={
              <InstallationCount
                color="text.default"
                minimal={true}
                installs={installs}
              />
            }
          />
          {sourceCode && (
            <Data
              label={_(t`Source code`)}
              value={
                <SourceCode
                  url={sourceCode}
                  additionalUrls={additionalSourceCode}
                />
              }
              warning={
                privateCode && (
                  <Trans>
                    <Box as="span" fontWeight="500">
                      {name}
                    </Box>{' '}
                    uses code that isn&apos;t viewable by the public. Critical
                    parts of the codebase were audited for security, but later
                    versions of the code may not be. Make sure you trust{' '}
                    <Box as="span" fontWeight="500">
                      {author.name}
                    </Box>{' '}
                    before installing and using{' '}
                    <Box as="span" fontWeight="500">
                      {name}
                    </Box>
                    .
                  </Trans>
                )
              }
            />
          )}
          {audits?.length > 0 && (
            <Data
              label={_(t`Audit`)}
              value={
                <Audits
                  audits={
                    audits as Fields<Queries.SnapAudits, 'auditor' | 'report'>[]
                  }
                />
              }
            />
          )}
          {(privacyPolicy || termsOfUse) && (
            <Data
              label={_(t`Legal`)}
              value={
                <Legal privacyPolicy={privacyPolicy} termsOfUse={termsOfUse} />
              }
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
