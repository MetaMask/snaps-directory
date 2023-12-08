import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Audits } from './Audits';
import { Data } from './Data';
import { MetadataItems } from './MetadataItems';
import { SourceCode } from './SourceCode';
import type { Fields } from '../../../utils';

export type MetadataModalProps = {
  snap: Fields<
    Queries.Snap,
    'snapId' | 'audits' | 'author' | 'latestVersion' | 'sourceCode' | 'website'
  >;
  isOpen: boolean;
  onClose: () => void;
};

export const MetadataModal: FunctionComponent<MetadataModalProps> = ({
  snap,
  isOpen,
  onClose,
}) => {
  const { audits, latestVersion, sourceCode } = snap;

  return (
    <Modal variant="minimal" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap="4">
          <MetadataItems snap={snap} />

          <Data label={t`Version`} value={latestVersion} />
          <Data
            label={t`Source Code`}
            value={<SourceCode url={sourceCode} />}
          />
          <Data
            label={t`Audit`}
            value={
              <Audits
                audits={
                  audits as Fields<Queries.SnapAudits, 'auditor' | 'report'>[]
                }
              />
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
