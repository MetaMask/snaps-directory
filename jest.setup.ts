import { beforeEach } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
// eslint-disable-next-line import/no-nodejs-modules
import { TextEncoder, TextDecoder } from 'util';

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line no-restricted-globals
global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
// eslint-disable-next-line no-restricted-globals
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

beforeEach(() => {
  const originalConsoleError = console.error;
  jest.spyOn(console, 'error').mockImplementation((error, ...args) => {
    // When testing the pages' Head component, we get the following error:
    // "<html> cannot appear as a child of <div>."
    // Because `@testing-library/react` renders the page in a div. We can
    // safely ignore this error, since Gatsby will render the Head component
    // in the <head> tag.
    if (
      typeof error === 'string' &&
      error.includes('cannot appear as a child of') &&
      args[0] === '<html>' &&
      args[1] === 'div'
    ) {
      return;
    }

    // Require tests to be wrapped in act(...).
    if (
      typeof error === 'string' &&
      error.includes('was not wrapped in act(...).')
    ) {
      originalConsoleError(error, ...args);
      throw new Error('Test was not wrapped in act(...).');
    }

    originalConsoleError(error, ...args);
  });
});
