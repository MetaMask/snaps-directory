// Note: This file is intentionally not exported from the package index, as it
// is intended to be used in the Gatsby build process, and not at runtime.

/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-nodejs-modules
import assert from 'assert';
import Jimp from 'jimp';
import shuffle from 'lodash/shuffle';
// eslint-disable-next-line import/no-nodejs-modules
import { resolve } from 'path';
import type { OverlayOptions } from 'sharp';
import sharp from 'sharp';

import type { Fields } from './snaps';

type Font = Awaited<ReturnType<typeof Jimp.loadFont>>;

// Note: Jimp only supports Bitmap fonts, so fonts must be converted to Bitmap
// fonts before they can be used. This can be done using a website like
// https://ttf2fnt.com.
const BASE_FONT_PATH = resolve(__dirname, '../assets/images/seo/fonts');

const LARGE_BLACK_FONT_PATH = resolve(BASE_FONT_PATH, 'large/black.fnt');
const LARGE_GREY_FONT_PATH = resolve(BASE_FONT_PATH, 'large/grey.fnt');
const SMALL_BLACK_FONT_PATH = resolve(BASE_FONT_PATH, 'small/black.fnt');
const SMALL_GREY_FONT_PATH = resolve(BASE_FONT_PATH, 'small/grey.fnt');

const MAX_FONT_WIDTH = 700;

const NAME_X = 109;
const NAME_Y = 102;

const AUTHOR_X = NAME_X;
const AUTHOR_Y = 186;

const SNAP_ICON_X = 908;
const SNAP_ICON_Y = 77;

const BADGE_X = 1019;
const BADGE_Y = 187;

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
 * Get the fonts to use for the given snap name and author. This will return
 * large fonts if the text will fit, and small fonts if it will not.
 *
 * @param name - The name of the snap.
 * @param author - The author of the snap.
 * @returns The fonts to use for the snap name and author.
 */
export async function getFonts(
  name: string,
  author: string,
): Promise<[Font, Font]> {
  const font = await Jimp.loadFont(LARGE_BLACK_FONT_PATH);
  if (
    Jimp.measureText(font, name) > MAX_FONT_WIDTH ||
    Jimp.measureText(font, author) > MAX_FONT_WIDTH
  ) {
    return await Promise.all([
      Jimp.loadFont(SMALL_BLACK_FONT_PATH),
      Jimp.loadFont(SMALL_GREY_FONT_PATH),
    ]);
  }

  return await Promise.all([
    Jimp.loadFont(LARGE_BLACK_FONT_PATH),
    Jimp.loadFont(LARGE_GREY_FONT_PATH),
  ]);
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
  const image = await Jimp.create(700, 100);
  image.print(font, 0, 0, normalizeName(value), 700);

  return image.getBufferAsync(Jimp.MIME_PNG);
}

/**
 * Get the icon to use for the given snap. This will return the icon if it is
 * provided, or a letter icon if it is not.
 *
 * @param name - The name of the snap.
 * @param icon - The icon of the snap. This should be a plain SVG string.
 * @returns The icon to use for the snap. This will be an array of layers to
 * render on top of the base image.
 */
export async function getIcon(name: string, icon?: string) {
  if (icon) {
    const normalizedImage = decodeURIComponent(
      icon.replace(/data:image\/svg\+xml;utf8,/gu, ''),
    );

    const snapIcon = sharp(Buffer.from(normalizedImage, 'utf-8')).resize({
      width: 188,
      height: 188,
    });

    return [
      {
        input: await snapIcon.png().toBuffer(),
        top: SNAP_ICON_Y,
        left: SNAP_ICON_X,
      },
    ];
  }

  const letter = name.charAt(0).toUpperCase();
  const image = await Jimp.create(188, 188);
  const font = await Jimp.loadFont(LARGE_GREY_FONT_PATH);

  const letterX = (188 - Jimp.measureText(font, letter)) / 2;
  const letterY = (188 - Jimp.measureTextHeight(font, letter, 188)) / 2;

  image.print(font, letterX, letterY, letter);

  return [
    {
      input: resolve(__dirname, '../assets/images/seo/icon.png'),
      top: SNAP_ICON_Y,
      left: SNAP_ICON_X,
    },
    {
      input: await image.getBufferAsync(Jimp.MIME_PNG),
      top: SNAP_ICON_Y,
      left: SNAP_ICON_X,
    },
  ];
}

/**
 * Generate an image for the given snap. This will render the snap name, author,
 * and icon on top of the base image.
 *
 * @param name - The name of the snap.
 * @param author - The author of the snap.
 * @param icon - The icon of the snap. This should be a plain SVG string.
 * @returns The buffer of the generated image.
 */
export async function generateSnapImage(
  name: string,
  author?: string,
  icon?: string,
) {
  const base = sharp(resolve(__dirname, '../assets/images/seo/base.png'));

  const [nameFont, authorFont] = await getFonts(name, author ?? '');
  const layers: OverlayOptions[] = [
    {
      input: await getText(name, nameFont),
      top: NAME_Y,
      left: NAME_X,
    },
    ...(await getIcon(name, icon)),
  ];

  if (author) {
    const authorText = await getText(author, authorFont);
    layers.push({
      input: authorText,
      top: AUTHOR_Y,
      left: AUTHOR_X,
    });
  }

  layers.push({
    input: resolve(__dirname, '../assets/images/seo/badge.png'),
    top: BADGE_Y,
    left: BADGE_X,
  });

  base.composite(layers);
  return await base.png().toBuffer();
}

const SNAP_ICON_OFFSET_X = 239;
const SNAP_ICON_OFFSET_Y = 78;

const SNAP_COUNT_X = SNAP_ICON_OFFSET_X + 112 * 5;
const SNAP_COUNT_Y = SNAP_ICON_OFFSET_Y;

/**
 * Get the Snaps that have an icon.
 *
 * @param snaps - The Snaps to filter.
 * @returns The Snaps that have an icon.
 */
export function getSnapsWithIcon(snaps: Fields<Queries.Snap, 'icon'>[]) {
  return snaps.filter((snap) => Boolean(snap.icon));
}

/**
 * Get a round icon for the given Snap icon.
 *
 * @param icon - The icon of the Snap.
 * @param size - The size of the icon.
 * @returns The buffer of the generated image.
 */
export async function getRoundIcon(icon: string, size = 158) {
  const normalizedImage = decodeURIComponent(
    icon.replace(/data:image\/svg\+xml;utf8,/gu, ''),
  );

  const base = sharp(
    resolve(__dirname, '../assets/images/seo/icon-base.png'),
  ).resize({
    width: size,
    height: size,
  });

  const snapIcon = sharp(Buffer.from(normalizedImage, 'utf-8'))
    .resize({
      width: size,
      height: size,
    })
    .composite([
      {
        input: await base.png().toBuffer(),
        blend: 'dest-in',
      },
    ]);

  // Some icons have a transparent background, so we need to add a white-ish
  // background to them.
  base.composite([
    {
      input: await snapIcon.png().toBuffer(),
    },
  ]);

  return await base.png().toBuffer();
}

/**
 * Generate an image for the given category. This will render random Snaps in
 * the category on top of the base image.
 *
 * @param snaps - The Snaps in the category.
 * @param countLimit - The amount of snaps to show before showing the count graphic.
 * @returns The buffer of the generated image.
 */
export async function generateCategoryImage(
  snaps: Fields<Queries.Snap, 'icon'>[],
  countLimit = 5,
) {
  const base = sharp(resolve(__dirname, '../assets/images/seo/category.png'));
  const layers: OverlayOptions[] = [];

  // Not all Snaps have an icon, so we need to filter them out.
  const filteredSnaps = getSnapsWithIcon(snaps);

  const randomSnaps = shuffle(filteredSnaps).slice(0, countLimit);
  const snapsLength =
    filteredSnaps.length > countLimit ? 6 : filteredSnaps.length;
  const firstSnapX =
    1200 / 2 - (snapsLength * 112 + (snapsLength - 1) * 10) / 2;

  for (const [index, { icon }] of randomSnaps.entries()) {
    const snapIcon = await getRoundIcon(icon);

    layers.push({
      input: snapIcon,
      top: SNAP_ICON_OFFSET_Y,
      left: firstSnapX + 112 * index,
    });
  }

  if (filteredSnaps.length > countLimit) {
    const count = `+${filteredSnaps.length - 5}`;
    const [, font] = await getFonts(count, '');
    const countText = await getText(count, font);

    const textWidth = Jimp.measureText(font, count);
    const textHeight = Jimp.measureTextHeight(font, count, 200);

    layers.push(
      {
        input: resolve(__dirname, '../assets/images/seo/count.png'),
        top: SNAP_COUNT_Y,
        left: SNAP_COUNT_X,
      },
      {
        input: countText,
        top: Math.round(SNAP_COUNT_Y + (158 - textHeight) / 2),
        left: Math.round(SNAP_COUNT_X + (158 - textWidth) / 2),
      },
    );
  }

  base.composite(layers);
  return await base.png().toBuffer();
}

const INSTALLED_FIRST_ROW_ITEMS = 12;
const INSTALLED_ROWS = 4;
const INSTALLED_SIZE = 82;
const INSTALLED_FIRST_Y = -29;
const INSTALLED_PADDING = 24;

/**
 * Center the given items within the given width, and padding between each item.
 * This will return the X coordinates of each item.
 *
 * @param width - The width to center the items within.
 * @param padding - The padding between each item.
 * @param items - The items to center.
 * @returns The X coordinates of each item.
 */
function centerItems(width: number, padding: number, items: number) {
  const totalWidth = items * width + (items - 1) * padding;
  const firstX = 1200 / 2 - totalWidth / 2;

  return Array.from({ length: items }, (_, index) => {
    return firstX + (width + padding) * index;
  });
}

/**
 * Generate an image for the given Snaps. This will render random Snaps on top
 * of the base image.
 *
 * @param snaps - The Snaps to render.
 */
export async function generateInstalledImage(
  snaps: Fields<Queries.Snap, 'icon'>[],
) {
  const base = sharp(resolve(__dirname, '../assets/images/seo/installed.png'));
  const layers: OverlayOptions[] = [];

  // Not all Snaps have an icon, so we need to filter them out.
  const filteredSnaps = getSnapsWithIcon(snaps);

  for (const index of new Array(INSTALLED_ROWS).fill(0).keys()) {
    const rowY =
      INSTALLED_FIRST_Y + (INSTALLED_SIZE + INSTALLED_PADDING) * index;
    const rowXs = centerItems(
      INSTALLED_SIZE,
      INSTALLED_PADDING,
      INSTALLED_FIRST_ROW_ITEMS - index,
    );

    for (const rowX of rowXs) {
      const snap = shuffle(filteredSnaps)[0];
      assert(snap);

      const snapIcon = await getRoundIcon(snap.icon, INSTALLED_SIZE);
      layers.push({
        input: snapIcon,
        top: rowY,
        left: rowX,
      });
    }
  }

  layers.push(
    {
      input: resolve(__dirname, '../assets/images/seo/gradient.png'),
      top: 0,
      left: 0,
    },
    {
      input: resolve(__dirname, '../assets/images/seo/fox.png'),
      top: 315,
      left: 346,
    },
  );

  base.composite(layers);
  return await base.png().toBuffer();
}
