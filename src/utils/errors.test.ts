import { formatErrorMessage, getErrorMessage, hasProperty } from './errors';

describe('formatErrorMessage', () => {
  it('capitalizes the first letter of the message', () => {
    expect(formatErrorMessage('foo')).toBe('Foo.');
  });

  it('adds a period at the end if the message does not have one', () => {
    expect(formatErrorMessage('foo')).toBe('Foo.');
    expect(formatErrorMessage('foo.')).toBe('Foo.');
  });
});

describe('hasProperty', () => {
  it('returns true if the object has the property', () => {
    expect(hasProperty({ foo: 'bar' }, 'foo')).toBe(true);
  });

  it('returns false if the object does not have the property', () => {
    expect(hasProperty({ foo: 'bar' }, 'bar')).toBe(false);
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
