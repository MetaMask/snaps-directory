// Note: This file is intentionally not exported from the package index, as it
// is intended to be used in the Gatsby build process, and not at runtime.

/* eslint-disable no-restricted-globals */

import Jimp from 'jimp';
// eslint-disable-next-line import/no-nodejs-modules
import { resolve } from 'path';
import type { OverlayOptions } from 'sharp';
import sharp from 'sharp';

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
export async function generateImage(
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
