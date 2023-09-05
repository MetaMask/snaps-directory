import type { FunctionComponent } from 'react';

import { ExternalLink } from './ExternalLink';

export type SnapSourceCodeProps = {
  url: string;
};

const KNOWN_SNAP_SOURCE_CODE_HOSTS = [
  {
    name: 'GitHub',
    url: 'github.com',
  },
  {
    name: 'GitLab',
    url: 'gitlab.com',
  },
  {
    name: 'Bitbucket',
    url: 'bitbucket.org',
  },
];

/**
 * Get the known host for the given URL. If the host is not known, the host
 * itself is returned.
 *
 * @param url - The URL to get the host for.
 * @returns The host name, or the host itself if it is not known.
 */
export function getSnapSourceCodeHost(url: string) {
  const { host } = new URL(url);

  return (
    KNOWN_SNAP_SOURCE_CODE_HOSTS.find((knownHost) => knownHost.url === host)
      ?.name ?? host
  );
}

export const SnapSourceCode: FunctionComponent<SnapSourceCodeProps> = ({
  url,
}) => {
  return <ExternalLink href={url}>{getSnapSourceCodeHost(url)}</ExternalLink>;
};
