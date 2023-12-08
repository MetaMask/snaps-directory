import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Data } from './Data';
import { Identifier } from './Identifier';
import { ExternalLink } from '../../../components';
import type { Fields } from '../../../utils';

export type MetadataItemsProps = {
  snap: Fields<Queries.Snap, 'snapId' | 'author' | 'website'>;
};

export const MetadataItems: FunctionComponent<MetadataItemsProps> = ({
  snap,
}) => {
  const { snapId, website, author } = snap;

  return (
    <>
      {author && (
        <Data
          label={t`Developer`}
          value={
            <ExternalLink href={author.website}>{author.name}</ExternalLink>
          }
        />
      )}

      <Data
        label={t`Identifier`}
        value={<Identifier snapId={snapId} website={website} />}
      />
    </>
  );
};
