/* eslint-disable import/no-nodejs-modules, no-restricted-globals */

import Jimp from 'jimp';
import { resolve } from 'path';
import sharp from 'sharp';

import { BASE_SEO_DIRECTORY, CANVAS_WIDTH, JIMP_FONTS } from './constants';
import type { Fields } from '../snaps';

export type Font = Awaited<ReturnType<typeof Jimp.loadFont>>;

export type Snap = Fields<Queries.Snap, 'name'> & { icon?: string };
export type SnapWithIcon = Snap & { icon: string };

/**
 * Get the Jimp fonts for a name and author.
 *
 * @param name - The name to use.
 * @param author - The author to use.
 * @returns A tuple containing the black and grey fonts.
 */
export async function getFonts(name: string, author = '') {
  for (const { maxWidth, black, grey } of JIMP_FONTS) {
    const font = await Jimp.loadFont(black);
    const width = Math.max(
      Jimp.measureText(font, name),
      Jimp.measureText(font, author),
    );

    if (width <= maxWidth) {
      return Promise.all([Jimp.loadFont(black), Jimp.loadFont(grey)]);
    }
  }

  throw new Error('Text is too long.');
}

/**
 * Get the path to an asset.
 *
 * @param name - The name of the image.
 * @returns The path to the image.
 */
export function getAssetPath(name: string) {
  return resolve(BASE_SEO_DIRECTORY, name);
}

/**
 * Get an instance of a Sharp image.
 *
 * @param name - The name of the image.
 * @returns The Sharp image instance.
 */
export function getImage(name: string) {
  return sharp(getAssetPath(`images/${name}.png`));
}

/**
 * Normalize the name to ensure it does not contain any non-ASCII characters.
 * This will also trim the name.
 *
 * @param name - The name to normalize.
 * @returns The normalized name.
 */
export function normalizeName(name: string) {
  return name.trim().replace(/[^\x20-\x7E]/gu, '');
}

/**
 * Render text as a PNG image, and return the buffer. This will trim the text,
 * and remove any characters that are not in the ASCII range of 32-126.
 *
 * @param value - The text to render.
 * @param font - The font to use.
 * @returns The buffer of the rendered image.
 */
export async function getText(value: string, font: Font) {
  const image = await Jimp.create(700, 300);
  image.print(font, 0, 0, normalizeName(value), 700);

  return image.getBufferAsync(Jimp.MIME_PNG);
}

/**
 * Get the Snaps that have an icon.
 *
 * @param snaps - The Snaps to filter.
 * @returns The Snaps that have an icon.
 */
export function getSnapsWithIcon(snaps: Snap[]): SnapWithIcon[] {
  return snaps.filter((snap): snap is SnapWithIcon => Boolean(snap.icon));
}

/**
 * Center the given items within the given width, and padding between each item.
 * This will return the X coordinates of each item.
 *
 * @param width - The width to center the items within.
 * @param padding - The padding between each item.
 * @param items - The items to center.
 * @returns The X coordinates of each item.
 */
export function centerItems(width: number, padding: number, items: number) {
  const totalWidth = items * width + (items - 1) * padding;
  const firstX = CANVAS_WIDTH / 2 - totalWidth / 2;

  return Array.from({ length: items }, (_, index) => {
    return firstX + (width + padding) * index;
  });
}
