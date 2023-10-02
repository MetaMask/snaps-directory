import type { FunctionComponent, ReactNode } from 'react';

export const graphql = jest.fn();

export const navigate = jest.fn();

export const useStaticQuery = jest.fn();

type LinkProps = {
  to: string;
  children: ReactNode;
};

export const Link: FunctionComponent<LinkProps> = ({
  to,
  children,
  ...rest
}) => (
  <a href={to} {...rest}>
    {children}
  </a>
);
