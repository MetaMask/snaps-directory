import { formatErrorMessage, getErrorMessage } from './errors';

describe('formatErrorMessage', () => {
  it('capitalizes the first letter of the message', () => {
    expect(formatErrorMessage('foo')).toBe('Foo.');
  });

  it('adds a period at the end if the message does not have one', () => {
    expect(formatErrorMessage('foo')).toBe('Foo.');
    expect(formatErrorMessage('foo.')).toBe('Foo.');
  });
});

describe('getErrorMessage', () => {
  it('returns the message if the error is an object with a message property', () => {
    expect(getErrorMessage({ message: 'foo' })).toBe('Foo.');
  });

  it('returns the error converted to a string if the error is not an object with a message property', () => {
    expect(getErrorMessage('foo')).toBe('Foo.');
  });

  it('returns the error converted to a string if the error is null', () => {
    expect(getErrorMessage(null)).toBe('Null.');
  });

  it('returns the error converted to a string if the error is undefined', () => {
    expect(getErrorMessage(undefined)).toBe('Undefined.');
  });

  it('returns the error converted to a string if the error is a number', () => {
    expect(getErrorMessage(42)).toBe('42.');
  });
});
