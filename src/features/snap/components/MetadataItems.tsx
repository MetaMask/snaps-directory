import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { Data } from './Data';
import { Identifier } from './Identifier';
import { ExternalLink } from '../../../components';
import type { Fields } from '../../../utils';

export type MetadataItemsProps = {
  snap: Fields<Queries.Snap, 'snapId' | 'author'>;
};

export const MetadataItems: FunctionComponent<MetadataItemsProps> = ({
  snap,
}) => {
  const { _ } = useLingui();
  const { snapId, author } = snap;

  return (
    <>
      {author && (
        <Data
          label={_(t`Developer`)}
          value={
            <ExternalLink href={author.website}>{author.name}</ExternalLink>
          }
        />
      )}

      <Data label={_(t`Identifier`)} value={<Identifier snapId={snapId} />} />
    </>
  );
};
