import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';
import type { Fields } from '../../../utils';

export type SnapLegalProps = {
  privacyPolicy: Fields<Queries.Snap, 'privacyPolicy'>;
  termsOfUse: Fields<Queries.Snap, 'termsOfUse'>;
};

export const Legal: FunctionComponent<SnapLegalProps> = ({
  privacyPolicy,
  termsOfUse,
}) => (
  <>
    {privacyPolicy && (
      <ExternalLink href={privacyPolicy}>
        <Trans>Privacy Policy</Trans>
      </ExternalLink>
    )}

    {termsOfUse && (
      <ExternalLink href={termsOfUse}>
        <Trans>Terms of Use</Trans>
      </ExternalLink>
    )}
  </>
);
