import { getAddress } from 'viem';

/**
 * Renders the short address of a user.
 *
 * @param address - The address to render.
 * @param chars - The number of characters to render.
 * @returns The rendered short address.
 */
export function renderShortAddress(address?: string, chars = 5) {
  if (!address) {
    return address;
  }
  const checksummedAddress = getAddress(address);
  return `${checksummedAddress.slice(
    0,
    chars + 2,
  )}...${checksummedAddress.slice(-chars)}`;
}
