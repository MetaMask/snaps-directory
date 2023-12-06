import { beforeEach } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

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
