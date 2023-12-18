import { Box, Center, keyframes, Tag, TagLabel } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

/**
 * Get the keyframes to use for the "pulse" animation.
 *
 * @param color - The colour to use for the animation.
 * @returns The keyframes to use for the "pulse" animation.
 */
// TODO: Figure out how to use theme colours in keyframes.
function getKeyframes(color: string) {
  return keyframes`
    0%, 15% {
      box-shadow: ${color} 0 0 0 0;
    }

    70% {
      box-shadow: ${color}1A 0 0 0 0.375rem;
    }

    85%, 100% {
      box-shadow: ${color}00 0 0 0 0.375rem;
    }
  `;
}

const KEYFRAME_VARIANTS = {
  success: getKeyframes('#28A745'),
  error: getKeyframes('#D73847'),
  default: getKeyframes('#EDEDED'),
};

export type AnnouncementProps = {
  children: ReactNode;
  variant?: 'success' | 'error' | 'default';
  live?: boolean;
};

export const Announcement: FunctionComponent<AnnouncementProps> = ({
  children,
  variant = 'success',
  live = true,
}) => (
  <Center>
    <Tag variant={variant} paddingLeft="3">
      {live && (
        <Box
          data-testid="live-icon"
          width="0.75rem"
          height="0.75rem"
          background={`${variant}.default`}
          borderRadius="full"
          animation={`${KEYFRAME_VARIANTS[variant]} 1.5s infinite linear`}
        />
      )}
      <TagLabel>{children}</TagLabel>
    </Tag>
  </Center>
);
