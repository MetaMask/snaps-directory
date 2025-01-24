/* eslint-disable import/no-nodejs-modules, no-restricted-globals */

import { resolve } from 'path';

import { getAssetPath } from './utils';

/**
 * The base directory for the images.
 */
export const BASE_SEO_DIRECTORY = resolve(__dirname, '../../assets/seo');

/**
 * The maximum width of the text for the images.
 */
export const FONT_MAX_WIDTH = 700;

/**
 * The Jimp fonts to use for the images. These are dynamically loaded based on
 * the width of the text.
 */
export const JIMP_FONTS = [
  {
    maxWidth: FONT_MAX_WIDTH,
    black: getAssetPath('fonts/large/black.fnt'),
    grey: getAssetPath('fonts/large/grey.fnt'),
  },
  {
    maxWidth: Infinity,
    black: getAssetPath('fonts/small/black.fnt'),
    grey: getAssetPath('fonts/small/grey.fnt'),
  },
];

/**
 * The width of the canvas for the images.
 */
export const CANVAS_WIDTH = 1200;

/**
 * The default size of the icon for the images.
 */
export const DEFAULT_ICON_SIZE = 256;

/**
 * The size of the small icon for the images.
 */
export const SMALL_ICON_SIZE = 158;

/**
 * The amount to overlap the icons by, used in the category images.
 */
export const ICON_OVERLAP = 46;

/**
 * The items per row for the installed Snaps image.
 */
export const INSTALLED_FIRST_ROW_ITEMS = 12;

/**
 * The number of rows for the installed Snaps image.
 */
export const INSTALLED_ROWS = 4;

/**
 * The size of each icon in the installed Snaps image.
 */
export const INSTALLED_SIZE = 82;

/**
 * The Y position of the first icon in the installed Snaps image.
 */
export const INSTALLED_FIRST_Y = -29;

/**
 * The padding between each icon in the installed Snaps image.
 */
export const INSTALLED_PADDING = 24;
