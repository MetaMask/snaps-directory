/**
 * Simple helper to get a mocked function. This simply casts the function to a
 * mocked function. This assumes that the function is already mocked.
 *
 * @param fn - The function mock.
 * @returns The mocked function.
 */
export function getMock<Func extends (...args: any[]) => unknown>(
  fn: Func,
): jest.MockedFunction<Func> {
  return fn as jest.MockedFunction<Func>;
}
