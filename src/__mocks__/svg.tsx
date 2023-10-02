import type { FunctionComponent, SVGProps } from 'react';

/**
 * Mock SVG component. This is used by Jest.
 *
 * @param props - Component props.
 * @returns Mock SVG component.
 */
const SvgComponent: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} />
);

export default SvgComponent;
