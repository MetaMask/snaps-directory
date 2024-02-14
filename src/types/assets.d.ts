// eslint-disable-next-line import/unambiguous
declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';

  const Component: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.svg?raw';

declare module '*.png';
