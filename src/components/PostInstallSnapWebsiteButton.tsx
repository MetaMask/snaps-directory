import { Box, Flex, Link } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { ExternalLinkIcon } from './icons';
import { SnapEventType, SnapWebsiteOrigin, track } from '../analytics';

export type PostInstallSnapWebsiteButtonProps = {
  snapId: string;
  website: string;
};

/**
 * Normalize a URL to its host and pathname.
 *
 * @param value - The URL to normalize.
 * @returns The normalized URL.
 */
function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    const path = url.pathname === '/' ? '' : url.pathname;
    return url.host + path;
  } catch {
    return value;
  }
}

/**
 * The website button for the post-install modal.
 *
 * @param props - The component props.
 * @param props.snapId - The ID of the Snap.
 * @param props.website - The website of the Snap.
 * @returns A React component.
 */
export const PostInstallSnapWebsiteButton: FunctionComponent<
  PostInstallSnapWebsiteButtonProps
> = ({ snapId, website }) => {
  const handleClick = () => {
    track({
      type: SnapEventType.Website,
      origin: SnapWebsiteOrigin.Modal,
      snapId,
    });
  };

  return (
    <Link variant="box" href={website} isExternal={true} onClick={handleClick}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          as="span"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {normalizeUrl(website)}
        </Box>
        {/* TODO: Muted icon */}
        <ExternalLinkIcon marginLeft="2" width="1.25rem" />
      </Flex>
    </Link>
  );
};
