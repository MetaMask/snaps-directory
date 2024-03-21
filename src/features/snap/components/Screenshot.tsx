import { Box } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { FunctionComponent } from 'react';

export type ScreenshotProps = {
  image: IGatsbyImageData;
  index: number;
  setShownScreenshot: (index: number) => void;
};

export const Screenshot: FunctionComponent<ScreenshotProps> = ({
  image,
  index,
  setShownScreenshot,
}) => {
  const onClick = () => {
    setShownScreenshot(index);
  };

  return (
    <Box
      maxW={['250px', null, '400px']}
      maxH={['140px', null, '225px']}
      flexShrink={0}
      borderRadius="2xl"
      overflow="hidden"
      onClick={onClick}
      sx={{
        '.gatsby-image-wrapper': {
          width: '100% !important',
          height: '100% !important',
        },
      }}
      _hover={{
        cursor: 'pointer',
      }}
    >
      <GatsbyImage alt="Snap image" image={image} />
    </Box>
  );
};
