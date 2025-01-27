import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { resolve } from 'path';

import {
  createCategoryImage,
  createFallbackIcon,
  createInstalledImage,
  createSnapIcon,
  createSnapImage,
} from './images';
import { getMockSnap } from '../test-utils';

// eslint-disable-next-line jest/require-top-level-describe
beforeAll(() => {
  const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotsDir: resolve(__dirname, '__snapshots__'),
  });

  expect.extend({ toMatchImageSnapshot });
});

const DEFAULT_SNAP_ICON =
  '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.037 0H6.975C2.605 0 0 2.617 0 6.987v10.05c0 4.37 2.605 6.975 6.975 6.975h10.05c4.37 0 6.975-2.605 6.975-6.976V6.988C24.012 2.617 21.407 0 17.037 0ZM11.49 17.757c0 .36-.18.684-.492.876a.975.975 0 0 1-.54.156 1.11 1.11 0 0 1-.469-.108l-4.202-2.1a1.811 1.811 0 0 1-.985-1.61v-3.973c0-.36.18-.685.493-.877a1.04 1.04 0 0 1 1.008-.048l4.202 2.101a1.8 1.8 0 0 1 .997 1.609v3.974h-.012Zm-.252-6.423L6.723 8.896a1.045 1.045 0 0 1-.528-.924c0-.384.204-.744.528-.924l4.515-2.438a1.631 1.631 0 0 1 1.524 0l4.515 2.438c.324.18.528.528.528.924s-.204.744-.528.924l-4.515 2.438c-.24.132-.504.192-.768.192a1.54 1.54 0 0 1-.756-.192Zm7.972 3.638c0 .684-.385 1.308-.997 1.608l-4.202 2.101c-.144.072-.3.108-.468.108a.975.975 0 0 1-.54-.156 1.017 1.017 0 0 1-.493-.876v-3.974c0-.684.384-1.309.997-1.609l4.202-2.101a1.04 1.04 0 0 1 1.008.048c.313.192.493.516.493.877v3.974Z" fill="#24272A"/></svg>';

describe('createFallbackIcon', () => {
  it('creates a fallback icon with the first letter of the name', async () => {
    const result = await createFallbackIcon('S');

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });

  it('creates a fallback icon with a custom size', async () => {
    const result = await createFallbackIcon('S', 128);

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });

  it('creates an icon with longer text', async () => {
    const result = await createFallbackIcon('+123', 256);

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });

  it('creates an icon with a custom font', async () => {
    const result = await createFallbackIcon('S', 128, 'fonts/large/black.fnt');

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });
});

describe('createSnapIcon', () => {
  it('creates an icon with the first letter of the name', async () => {
    const result = await createSnapIcon('Snap');

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });

  it('creates an icon with an SVG icon', async () => {
    const result = await createSnapIcon('Snap', DEFAULT_SNAP_ICON);

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });

  it('creates an icon with a custom size', async () => {
    const result = await createSnapIcon('Snap', DEFAULT_SNAP_ICON, 128);

    expect(result).toBeDefined();
    expect(result).toMatchImageSnapshot();
  });
});

describe('createCategoryImage', () => {
  it('creates a category image', async () => {
    const image = await createCategoryImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Qux Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });

  it('creates a category image for more than five Snaps', async () => {
    const image = await createCategoryImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Qux Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Quux Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Corge Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });
});

describe('createSnapImage', () => {
  it('creates an image for a Snap', async () => {
    const image = await createSnapImage(
      'Foo Snap',
      'MetaMask',
      DEFAULT_SNAP_ICON,
    );

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });

  it('creates an image for a Snap without an author', async () => {
    const image = await createSnapImage('Foo Snap', undefined);

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });

  it('creates an image for a Snap with a long name', async () => {
    const image = await createSnapImage(
      'Snap with long name',
      'MetaMask',
      DEFAULT_SNAP_ICON,
    );

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });

  it('creates an image for a Snap with a long author name', async () => {
    const image = await createSnapImage(
      'Foo Snap',
      'MeeeeeeeeeeetaMask',
      DEFAULT_SNAP_ICON,
    );

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });

  it('wraps the text if it is too long', async () => {
    const image = await createSnapImage(
      'Foo Snap with a very long name that should be wrapped',
      'MetaMask',
      DEFAULT_SNAP_ICON,
    );

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });
});

describe('createInstalledImage', () => {
  it('creates an image for the installed Snaps', async () => {
    const image = await createInstalledImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toBeDefined();
    expect(image).toMatchImageSnapshot();
  });
});
