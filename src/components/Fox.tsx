import { Box } from '@chakra-ui/react';
import ModelViewer from '@metamask/logo';
import type { FunctionComponent } from 'react';
import { useCallback, useEffect, useState } from 'react';

export const Fox: FunctionComponent = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const callback = useCallback<(node: HTMLElement | null) => void>((node) => {
    if (node !== null) {
      setRef(node);
    }
  }, []);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const viewer = new ModelViewer({
      pxNotRatio: true,
      width: 300,
      height: 200,
      followMouse: true,
    });

    ref.appendChild(viewer.container);

    // eslint-disable-next-line consistent-return
    return () => {
      viewer.stopAnimation();
      ref.removeChild(viewer.container);
    };
  }, [ref]);

  return <Box ref={callback} />;
};
