import { Stack } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { NavigationButton } from './NavigationButton';

export type NavigationProps = {
  current: number;
  items: number;
  onChange: (value: number) => void;
};

export const Navigation: FunctionComponent<NavigationProps> = ({
  current,
  items,
  onChange,
}) => {
  return (
    <Stack
      position="absolute"
      bottom="6"
      left="50%"
      transform="translateX(-50%)"
      zIndex="2"
      direction="row"
      gap="2"
      padding="2"
      background="icon.alternative-muted"
      borderRadius="full"
    >
      {new Array(items).fill(null).map((_, index) => (
        <NavigationButton
          data-testid={`navigation-${index}`}
          index={index}
          current={current === index}
          onChange={onChange}
          key={`carousel-${index}`}
        />
      ))}
    </Stack>
  );
};
