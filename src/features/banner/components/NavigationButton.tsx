import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type NavigationButtonProps = Omit<BoxProps, 'onChange'> & {
  index: number;
  current: boolean;
  onChange: (value: number) => void;
};

export const NavigationButton: FunctionComponent<NavigationButtonProps> = ({
  index,
  current,
  onChange,
  ...props
}) => {
  const handleClick = () => {
    onChange(index);
  };

  return (
    <Box
      data-testid={`navigation-button-${index}`}
      cursor="pointer"
      onClick={handleClick}
      width="0.75rem"
      height="0.75rem"
      background={current ? 'primary.inverse' : 'icon.muted'}
      borderRadius="0.375rem"
      {...props}
    />
  );
};
