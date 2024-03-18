import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

export type ScreenshotsProps = {
  screenshots: {
    childImageSharp: {
      medium: IGatsbyImageData;
      large: IGatsbyImageData;
    };
  }[];
};

export const Screenshots: FunctionComponent<ScreenshotsProps> = ({
  screenshots,
}) => {
  const [shownScreenshot, setShownScreenshot] = useState<number | null>(null);
  const isOpen = shownScreenshot !== null;

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (event.code === 'ArrowLeft') {
        setShownScreenshot((state) => Math.max((state as number) - 1, 0));
      } else if (event.code === 'ArrowRight') {
        setShownScreenshot((state) => Math.min((state as number) + 1, 2));
      }
    };

    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [isOpen]);

  const onClose = () => {
    setShownScreenshot(null);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" gap="6">
        {screenshots.map((image, index) => (
          <Box
            key={index}
            maxW={['250px', null, '400px']}
            maxH={['140px', null, '225px']}
            flexShrink={0}
            borderRadius="2xl"
            overflow="hidden"
            onClick={() => setShownScreenshot(index)}
            sx={{
              '.gatsby-image-wrapper': {
                width: '100% !important',
                height: '100% !important',
              },
            }}
          >
            <GatsbyImage
              alt="Snap image"
              image={image.childImageSharp.medium}
            />
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
          <GatsbyImage
            alt="Snap image"
            image={
              screenshots[shownScreenshot as number]?.childImageSharp
                .large as IGatsbyImageData
            }
          />
        </ModalContent>
      </Modal>
    </>
  );
};
