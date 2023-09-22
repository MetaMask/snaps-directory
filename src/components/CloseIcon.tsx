import type { BoxProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type CloseIconProps = BoxProps;

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => (
  <Flex
    display="inline-flex"
    justifyContent="center"
    width="16px"
    marginLeft="1"
    transition="all 0.2s"
    _hover={{
      cursor: 'pointer',
      opacity: '0.8',
    }}
    {...props}
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.25922 11.3334C1.08144 11.3334 0.962922 11.2741 0.844404 11.1556C0.607367 10.9185 0.607367 10.563 0.844404 10.3259L10.3259 0.844465C10.5629 0.607428 10.9185 0.607428 11.1555 0.844465C11.3926 1.0815 11.3926 1.43706 11.1555 1.67409L1.67403 11.1556C1.55551 11.2741 1.437 11.3334 1.25922 11.3334Z" />
      <path d="M10.7407 11.3334C10.5629 11.3334 10.4444 11.2741 10.3259 11.1556L0.844404 1.67409C0.607367 1.43706 0.607367 1.0815 0.844404 0.844465C1.08144 0.607428 1.437 0.607428 1.67403 0.844465L11.1555 10.3259C11.3926 10.563 11.3926 10.9185 11.1555 11.1556C11.037 11.2741 10.9185 11.3334 10.7407 11.3334Z" />
    </svg>
  </Flex>
);
