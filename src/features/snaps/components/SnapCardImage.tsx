import { Avatar, Box, Flex } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type SnapCardImageProps = {
  name: string;
  icon: string;
};

export const SnapCardImage: FunctionComponent<SnapCardImageProps> = ({
  name,
  icon,
}) => (
  <Flex
    width="100%"
    height="11rem"
    overflow="hidden"
    borderRadius="lg"
    marginBottom="4"
    position="relative"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    data-testid="snap-card-image"
  >
    <Avatar
      src={icon}
      name={name.slice(0, 1).toUpperCase()}
      fontSize="md"
      color="text.alternative"
      size="md"
      width="6rem"
      height="6rem"
      margin="1"
      zIndex="1"
    />
    <Box
      position="absolute"
      width="100%"
      height="100%"
      sx={{
        background: `url("${icon}") center center / cover no-repeat, lightgray 50% / cover no-repeat`,
        filter: 'blur(55px) contrast(0.9) saturate(1.3)',
        transform: 'scale(1.25)',
      }}
    />
  </Flex>
);
