import type { FunctionComponent } from 'react';

import { ExternalLink } from '../../../components';
import { getLinkText } from '../../../utils';

export type SourceCodeProps = {
  url: string;
};

export const SourceCode: FunctionComponent<SourceCodeProps> = ({ url }) => {
  return <ExternalLink href={url}>{getLinkText(url)}</ExternalLink>;
};
