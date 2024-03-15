import {
  Image,
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

export const Screenshots = () => {
  const screenshots = [
    'https://placehold.co/960x540',
    'https://placehold.co/960x540',
    'https://placehold.co/960x540',
  ];

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

  const onImageClick = (event: MouseEvent<HTMLImageElement>) => {
    setShownScreenshot(screenshots.indexOf(event.target.currentSrc));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" gap="6">
        {screenshots.map((src, index) => (
          <Image
            key={index}
            src={src}
            maxW={['250px', null, '400px']}
            borderRadius="2xl"
            onClick={onImageClick}
          />
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <Image
            src={screenshots[shownScreenshot as number] as string}
            borderRadius="2xl"
          />
        </ModalContent>
      </Modal>
    </>
  );
};
