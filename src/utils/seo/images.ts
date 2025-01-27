/* eslint-disable import/no-nodejs-modules, no-restricted-globals */

import assert from 'assert';
import Jimp from 'jimp';
import shuffle from 'lodash/shuffle';
import sharp, { type OverlayOptions } from 'sharp';

import {
  CANVAS_WIDTH,
  DEFAULT_ICON_SIZE,
  FONT_MAX_WIDTH,
  ICON_OVERLAP,
  INSTALLED_FIRST_ROW_ITEMS,
  INSTALLED_FIRST_Y,
  INSTALLED_PADDING,
  INSTALLED_ROWS,
  INSTALLED_SIZE,
  SMALL_ICON_SIZE,
} from './constants';
import type { Snap } from './utils';
import {
  centerItems,
  getText,
  getFonts,
  getAssetPath,
  getImage,
  getSnapsWithIcon,
} from './utils';

/**
 * Create a fallback icon for a Snap. This will create an icon with a default
 * background and the provided text.
 *
 * @param text - The text to use for the icon.
 * @param size - The size of the icon. Defaults to 256.
 * @param fontPath - The path to the font to use. Defaults to
 * 'fonts/icon/grey.fnt'.
 */
export async function createFallbackIcon(
  text: string,
  size = 256,
  fontPath = 'fonts/icon/grey.fnt',
) {
  const image = await Jimp.create(size, size);
  const font = await Jimp.loadFont(getAssetPath(fontPath));

  const letterX = (size - Jimp.measureText(font, text)) / 2;
  const letterY = (size - Jimp.measureTextHeight(font, text, size)) / 2;

  image.print(font, letterX, letterY, text);

  const icon = getImage('icon');
  const input = await image.getBufferAsync(Jimp.MIME_PNG);

  return icon
    .resize(size, size)
    .composite([
      {
        input,
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Create a circular icon for a Snap. If the Snap doesn't have an icon, an icon
 * with the first letter of the name will be created.
 *
 * @param name - The name of the Snap.
 * @param svgIcon - The SVG icon of the Snap.
 * @param size - The size of the icon. Defaults to 256.
 */
export async function createSnapIcon(
  name: string,
  svgIcon?: string,
  size = DEFAULT_ICON_SIZE,
) {
  if (svgIcon) {
    const normalisedSvgIcon = decodeURIComponent(
      svgIcon.replace(/data:image\/svg\+xml;utf8,/gu, ''),
    );

    const background = getImage('flat-icon').resize(size, size);
    const icon = sharp(Buffer.from(normalisedSvgIcon, 'utf-8')).resize(
      size,
      size,
    );

    // Mask the icon with the mask image to create a circular icon.
    const mask = await getImage('mask').resize(size, size).png().toBuffer();
    const circularIcon = await icon
      .composite([
        {
          input: mask,
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();

    return await background
      .composite([
        {
          input: circularIcon,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
  }

  const letter = name.charAt(0).toUpperCase();
  return createFallbackIcon(letter, size);
}

const SNAP_ICON_OFFSET_X = 239;
const SNAP_ICON_OFFSET_Y = 78;

const SNAP_COUNT_X = SNAP_ICON_OFFSET_X + 112 * 5;
const SNAP_COUNT_Y = SNAP_ICON_OFFSET_Y;

/**
 * Create a PNG image for a category.
 *
 * @param snaps - The snaps to create the category image for.
 * @returns The buffer of the image.
 */
export async function createCategoryImage(snaps: Snap[]) {
  const filteredSnaps = getSnapsWithIcon(snaps);
  const randomSnaps = shuffle(filteredSnaps).slice(0, 5);

  const snapsLength = filteredSnaps.length > 5 ? 6 : filteredSnaps.length;
  const totalIconsWidth =
    SMALL_ICON_SIZE + (snapsLength - 1) * (SMALL_ICON_SIZE - ICON_OVERLAP);
  const firstIconX = (CANVAS_WIDTH - totalIconsWidth) / 2;

  const background = getImage('category');

  const layers: OverlayOptions[] = [];
  for (const [index, { name, icon }] of randomSnaps.entries()) {
    const snapIcon = await createSnapIcon(name, icon, SMALL_ICON_SIZE);

    layers.push({
      input: snapIcon,
      top: 78,
      left: firstIconX + (SMALL_ICON_SIZE - ICON_OVERLAP) * index,
    });
  }

  if (filteredSnaps.length > 5) {
    const count = `+${filteredSnaps.length - 5}`;

    layers.push({
      input: await createFallbackIcon(count, 158, 'fonts/medium/grey.fnt'),
      top: SNAP_COUNT_Y,
      left: SNAP_COUNT_X,
    });
  }

  return await background.composite(layers).png().toBuffer();
}

/**
 * Create a PNG image for a Snap.
 *
 * @param name - The name of the Snap.
 * @param author - The author of the Snap.
 * @param icon - The icon of the Snap.
 * @returns The buffer of the image.
 */
export async function createSnapImage(
  name: string,
  author?: string,
  icon?: string,
) {
  const background = getImage('background');
  const [black, grey] = await getFonts(name, author);

  // The name may take two lines, so we need to calculate the height of the
  // name to determine the top of the author text.
  const nameHeight = Jimp.measureTextHeight(black, name, FONT_MAX_WIDTH);
  const authorTop = 85 + nameHeight;

  background.composite([
    {
      input: getAssetPath('images/logo.png'),
      top: 462,
      left: 108,
    },
    {
      input: await getText(name, black),
      top: 85,
      left: 108,
    },
    {
      input: await getText(author ?? '', grey),
      top: authorTop,
      left: 108,
    },
    {
      input: await createSnapIcon(name, icon),
      top: 59,
      left: 846,
    },
  ]);

  return await background.png().toBuffer();
}

/**
 * Create a PNG image for the installed Snaps.
 *
 * @param snaps - The Snaps to create the installed image for.
 * @returns The buffer of the image.
 */
export async function createInstalledImage(snaps: Snap[]) {
  const filteredSnaps = getSnapsWithIcon(snaps);

  const layers: OverlayOptions[] = [];
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

      const snapIcon = await createSnapIcon(
        snap.name,
        snap.icon,
        INSTALLED_SIZE,
      );

      layers.push({
        input: snapIcon,
        top: rowY,
        left: rowX,
      });
    }
  }

  layers.push(
    {
      input: getAssetPath('images/gradient.png'),
      top: 0,
      left: 0,
    },
    {
      input: getAssetPath('images/fox.png'),
      top: 315,
      left: 346,
    },
  );

  const background = getImage('installed');
  return await background.composite(layers).png().toBuffer();
}
