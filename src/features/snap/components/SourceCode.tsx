import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';
import { getLinkText } from '../../../utils';

export type SourceCodeProps = {
  url: string;
  additionalUrls?: readonly { name: string; url: string }[];
};

export const SourceCode: FunctionComponent<SourceCodeProps> = ({
  url,
  additionalUrls,
}) => {
  if (additionalUrls?.length && additionalUrls.length > 0) {
    return (
      <>
        <ExternalLink href={url}>Main ({getLinkText(url)})</ExternalLink>
        {additionalUrls.map(({ name, url: additionalUrl }) => (
          <ExternalLink key={additionalUrl} href={additionalUrl}>
            {name} ({getLinkText(additionalUrl)})
          </ExternalLink>
        ))}
      </>
    );
  }

  return <ExternalLink href={url}>{getLinkText(url)}</ExternalLink>;
};
