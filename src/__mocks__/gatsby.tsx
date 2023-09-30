export const graphql = jest.fn();

export const navigate = jest.fn();

export const useStaticQuery = jest.fn();

export const Link = jest
  .fn()
  .mockImplementation(({ to, ...rest }) => <a href={to} {...rest} />);
