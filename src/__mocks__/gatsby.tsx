import type { FunctionComponent, ReactNode } from 'react';

import { getMockSiteMetadata } from '../utils/test-utils/queries';

export const graphql = jest.fn();

export const navigate = jest.fn();

export const useStaticQuery = jest.fn().mockReturnValue({
  ...getMockSiteMetadata(),
  fusejs: {},
});

export const withPrefix = jest.fn().mockImplementation((path) => path);

type LinkProps = {
  to: string;
  children: ReactNode;
};

export const Link: FunctionComponent<LinkProps> = ({
  to,
  children,
  ...rest
}) => (
  <a href="#" {...rest}>
    {children}
  </a>
);
