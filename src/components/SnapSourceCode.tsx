import type { FunctionComponent } from 'react';

import { getLinkText } from '../utils';
import { ExternalLink } from './ExternalLink';

export type SnapSourceCodeProps = {
  url: string;
};

export const SnapSourceCode: FunctionComponent<SnapSourceCodeProps> = ({
  url,
}) => {
  return <ExternalLink href={url}>{getLinkText(url)}</ExternalLink>;
};
