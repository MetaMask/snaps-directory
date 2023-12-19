import { Box } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useEffect, useState, Children } from 'react';

import { Navigation } from './Navigation';

type CarouselProps = {
  interval?: number;
  children: ReactNode;
};

export type CarouselContextType = {
  current: number;
  items: number;
};

export const CarouselContext = createContext<CarouselContextType>({
  current: 0,
  items: 0,
});

export const Carousel: FunctionComponent<CarouselProps> = ({
  interval = 15000,
  children,
}) => {
  const [current, setCurrent] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((value) => (value + 1) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [current, items.length, interval]);

  return (
    <CarouselContext.Provider value={{ current, items: items.length }}>
      <Box position="relative" height="100%">
        {items.map((item, index) => (
          <Box
            data-testid={`slide-${index}`}
            key={index}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={index === current ? 1 : 0}
            transition="opacity 0.5s"
            pointerEvents={index === current ? 'auto' : 'none'}
          >
            {item}
          </Box>
        ))}
        <Navigation
          current={current}
          items={items.length}
          onChange={setCurrent}
        />
      </Box>
    </CarouselContext.Provider>
  );
};
