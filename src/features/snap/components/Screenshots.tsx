import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import { Screenshot } from './Screenshot';
import type { Screenshot as ScreenshotType } from '../../../utils';

export type ScreenshotsProps = {
  name: string;
  screenshots: ScreenshotType[];
};

export const Screenshots: FunctionComponent<ScreenshotsProps> = ({
  name,
  screenshots,
}) => {
  const { _ } = useLingui();
  const [shownScreenshot, setShownScreenshot] = useState<number | null>(null);
  const isOpen = shownScreenshot !== null;

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      switch (event.code) {
        case 'ArrowLeft':
          setShownScreenshot((state) => Math.max((state as number) - 1, 0));
          break;
        case 'ArrowRight':
          setShownScreenshot((state) => Math.min((state as number) + 1, 2));
          break;
        default:
          break;
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
          <Screenshot
            key={index}
            name={name}
            index={index}
            image={image.childImageSharp.medium}
            setShownScreenshot={setShownScreenshot}
          />
        ))}
      </Box>

      <Modal
        variant="screenshot"
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          {screenshots[shownScreenshot as number] && (
            <GatsbyImage
              data-testid={`screenshot-modal-${shownScreenshot}`}
              alt={_(t`Screenshot for ${name}`)}
              image={
                screenshots[shownScreenshot as number]?.childImageSharp
                  .large as IGatsbyImageData
              }
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
