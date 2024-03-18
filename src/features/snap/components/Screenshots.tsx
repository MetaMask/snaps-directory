import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import type { Fields } from '../../../utils';

export type ScreenshotsProps = {
  screenshots: Fields<Queries.Snap, 'screenshots'>;
};

export const Screenshots: FunctionComponent<ScreenshotsProps> = ({
  screenshots,
}) => {
  const images = screenshots.map((screenshot) => ({
    small: screenshot.childImageSharp.small,
    medium: screenshot.childImageSharp.medium,
    large: screenshot.childImageSharp.large,
  }));

  const [shownScreenshot, setShownScreenshot] = useState<number | null>(null);
  const isOpen = shownScreenshot !== null;

  useEffect(() => {
    const onKeyUp = (ev: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (ev.code === 'ArrowLeft') {
        setShownScreenshot((state) => Math.max((state as number) - 1, 0));
      } else if (ev.code === 'ArrowRight') {
        setShownScreenshot((state) => Math.min((state as number) + 1, 2));
      }
    };
    window.addEventListener('keyup', onKeyUp, false);
    return () => {
      window.removeEventListener('keyup', onKeyUp, false);
    };
  }, [isOpen]);

  const onClose = () => {
    setShownScreenshot(null);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" gap="6">
        {images.map((image, index) => (
          <Box
            key={index}
            maxW={['250px', null, '400px']}
            maxH={['140px', null, '225px']}
            flexShrink={0}
            borderRadius="2xl"
            overflow="hidden"
            onClick={() => setShownScreenshot(index)}
          >
            <GatsbyImage image={image.medium} />
          </Box>
        ))}
      </Box>

      <Modal
        variant="screenshot"
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <GatsbyImage image={images[shownScreenshot as number]?.large} />
        </ModalContent>
      </Modal>
    </>
  );
};
