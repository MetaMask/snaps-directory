import { Box } from '@chakra-ui/react';
import ModelViewer from '@metamask/logo';
import type { FunctionComponent } from 'react';
import { useCallback, useEffect, useState } from 'react';

const FOX_RATIO = 0.75;

export type FoxProps = {
  width?: number;
  height?: number;
};

export const Fox: FunctionComponent<FoxProps> = ({
  width = 300,
  height = width * FOX_RATIO,
}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const callback = useCallback<(node: HTMLElement | null) => void>((node) => {
    if (node !== null) {
      setRef(node);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref) {
      return;
    }

    const viewer = new ModelViewer({
      pxNotRatio: true,
      width,
      height,
      followMouse: true,
    });

    ref.appendChild(viewer.container);

    // eslint-disable-next-line consistent-return
    return () => {
      viewer.stopAnimation();
      ref.removeChild(viewer.container);
    };
  }, [ref, width, height]);

  return (
    <Box
      ref={callback}
      width={`${width / 16}rem`}
      height={`${height / 16}rem`}
    />
  );
};
