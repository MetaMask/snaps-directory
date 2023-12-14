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
  const currentItem = items[current];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((value) => (value + 1) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [current, items.length, interval]);

  console.log(currentItem, items);

  return (
    <CarouselContext.Provider value={{ current, items: items.length }}>
      <Box position="relative" height="100%">
        {currentItem}
        <Navigation
          current={current}
          items={items.length}
          onChange={setCurrent}
        />
      </Box>
    </CarouselContext.Provider>
  );
};
