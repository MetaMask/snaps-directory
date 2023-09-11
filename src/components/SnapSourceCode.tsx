import type { FunctionComponent } from 'react';

import { ExternalLink } from './ExternalLink';
import { getLinkText } from '../utils';

export type SnapSourceCodeProps = {
  url: string;
};

export const SnapSourceCode: FunctionComponent<SnapSourceCodeProps> = ({
  url,
}) => {
  return <ExternalLink href={url}>{getLinkText(url)}</ExternalLink>;
};
