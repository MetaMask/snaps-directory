import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type NavigationButtonProps = {
  index: number;
  current: boolean;
  onChange: (value: number) => void;
};

export const NavigationButton: FunctionComponent<NavigationButtonProps> = ({
  index,
  current,
  onChange,
}) => {
  const handleClick = () => {
    onChange(index);
  };

  return (
    <Box
      cursor="pointer"
      onClick={handleClick}
      width="0.75rem"
      height="0.75rem"
      background={current ? 'primary.inverse' : 'icon.muted'}
      borderRadius="0.375rem"
    />
  );
};
