import { renderShortAddress } from './address';

describe('renderShortAddress', () => {
  it('returns the address as is if it is falsy', () => {
    expect(renderShortAddress(undefined)).toBeUndefined();
    expect(renderShortAddress(null)).toBeNull();
    expect(renderShortAddress('')).toBe('');
  });

  it('returns a shortened address with ellipsis', () => {
    const address = '0x1234567890abcdef';
    expect(renderShortAddress(address)).toBe('0x1234...cdef');
  });

  it('returns a shortened address with custom number of characters', () => {
    const address = '0x1234567890abcdef';
    expect(renderShortAddress(address, 3)).toBe('0x12...ef');
    expect(renderShortAddress(address, 8)).toBe('0x12345678...cdef');
  });
});
