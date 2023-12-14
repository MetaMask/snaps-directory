import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useEffect, useState, Children } from 'react';

import { Navigation } from './Navigation';

const MotionFlex = motion(Flex);

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
  interval = 10000,
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

  return (
    <CarouselContext.Provider value={{ current, items: items.length }}>
      <Box position="relative" height="100%">
        <AnimatePresence initial={false} mode="popLayout">
          <MotionFlex
            key={current}
            height="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
          >
            {currentItem}
          </MotionFlex>
        </AnimatePresence>
        <Navigation
          current={current}
          items={items.length}
          onChange={setCurrent}
        />
      </Box>
    </CarouselContext.Provider>
  );
};
