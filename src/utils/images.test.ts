import { expect } from '@jest/globals';
import { resolve } from 'path';
import sharp from 'sharp';

import {
  generateCategoryImage,
  generateInstalledImage,
  generateSnapImage,
  getFonts,
  getIcon,
  getRoundIcon,
  getSnapsWithIcon,
  getText,
  normalizeName,
} from './images';
import { getMockSnap } from './test-utils';

const SNAPSHOT_DIRECTORY = resolve(__dirname, '__snapshots__');
const DEFAULT_SNAP_ICON =
  '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.037 0H6.975C2.605 0 0 2.617 0 6.987v10.05c0 4.37 2.605 6.975 6.975 6.975h10.05c4.37 0 6.975-2.605 6.975-6.976V6.988C24.012 2.617 21.407 0 17.037 0ZM11.49 17.757c0 .36-.18.684-.492.876a.975.975 0 0 1-.54.156 1.11 1.11 0 0 1-.469-.108l-4.202-2.1a1.811 1.811 0 0 1-.985-1.61v-3.973c0-.36.18-.685.493-.877a1.04 1.04 0 0 1 1.008-.048l4.202 2.101a1.8 1.8 0 0 1 .997 1.609v3.974h-.012Zm-.252-6.423L6.723 8.896a1.045 1.045 0 0 1-.528-.924c0-.384.204-.744.528-.924l4.515-2.438a1.631 1.631 0 0 1 1.524 0l4.515 2.438c.324.18.528.528.528.924s-.204.744-.528.924l-4.515 2.438c-.24.132-.504.192-.768.192a1.54 1.54 0 0 1-.756-.192Zm7.972 3.638c0 .684-.385 1.308-.997 1.608l-4.202 2.101c-.144.072-.3.108-.468.108a.975.975 0 0 1-.54-.156 1.017 1.017 0 0 1-.493-.876v-3.974c0-.684.384-1.309.997-1.609l4.202-2.101a1.04 1.04 0 0 1 1.008.048c.313.192.493.516.493.877v3.974Z" fill="#24272A"/></svg>';

jest.setTimeout(10000);

describe('normalizeName', () => {
  it('removes non-ASCII characters from a string', () => {
    expect(normalizeName('fooáéíóúbar')).toBe('foobar');
  });
});

describe('getFonts', () => {
  it('returns a tuple of fonts for the given name and author', async () => {
    const [name, author] = await getFonts('foo', 'bar');

    expect(name.info.size).toBe(-72);
    expect(author.info.size).toBe(-72);
  });

  it('returns a tuple of small fonts for a long name', async () => {
    const [name, author] = await getFonts(
      'foofoofoofoofoofoofoofoofoofoofoofoofoo',
      'bar',
    );

    expect(name.info.size).toBe(-48);
    expect(author.info.size).toBe(-48);
  });

  it('returns a tuple of small fonts for a long author', async () => {
    const [name, author] = await getFonts(
      'foo',
      'barbarbarbarbarbarbarbarbarbarbarbarbar',
    );

    expect(name.info.size).toBe(-48);
    expect(author.info.size).toBe(-48);
  });
});

describe('getText', () => {
  it('renders text to PNG', async () => {
    const [font] = await getFonts('foo', 'bar');
    const buffer = await getText('Hello, world!', font);

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });

  it('renders secondary text to PNG', async () => {
    const [, font] = await getFonts('foo', 'bar');
    const buffer = await getText('Hello, world!', font);

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });
});

describe('getIcon', () => {
  it('renders an icon to PNG for a Snap without an icon', async () => {
    const layers = await getIcon('Foo Snap');
    const image = sharp({
      create: {
        width: 188,
        height: 188,
        channels: 4, // RGBA
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    }).composite(layers.map(({ input }) => ({ input })));

    expect(await image.png().toBuffer()).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });

  it('renders an icon to PNG for a Snap with an icon', async () => {
    const layers = await getIcon('Foo Snap', DEFAULT_SNAP_ICON);
    const image = sharp({
      create: {
        width: 188,
        height: 188,
        channels: 4, // RGBA
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    }).composite(layers.map(({ input }) => ({ input })));

    expect(await image.png().toBuffer()).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });
});

describe('generateSnapImage', () => {
  it('renders an image for a Snap', async () => {
    const image = await generateSnapImage(
      'Foo Snap',
      'MetaMask',
      DEFAULT_SNAP_ICON,
    );

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });

  it('renders an image for a Snap without an author', async () => {
    const image = await generateSnapImage(
      'Foo Snap',
      undefined,
      DEFAULT_SNAP_ICON,
    );

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });
});

describe('getSnapsWithIcon', () => {
  it('returns a list of Snaps with icons', () => {
    const snaps = getSnapsWithIcon([
      getMockSnap({ name: 'MetaMask', icon: null }).snap,
      getMockSnap({ name: 'Foo Snap', icon: 'foo' }).snap,
      getMockSnap({ name: 'Bar Snap', icon: 'bar' }).snap,
    ]);

    expect(snaps).toBeInstanceOf(Array);
    expect(snaps).toHaveLength(2);
    expect(snaps[0]?.icon).toBe('foo');
    expect(snaps[1]?.icon).toBe('bar');
  });
});

describe('getRoundIcon', () => {
  it('returns a round icon for a Snap', async () => {
    const image = await getRoundIcon(DEFAULT_SNAP_ICON);

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });
});

describe('generateCategoryImage', () => {
  it('renders an image for a category', async () => {
    const image = await generateCategoryImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Qux Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });

  it('renders an image for a category with many snaps', async () => {
    const image = await generateCategoryImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Qux Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Quux Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Corge Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Grault Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Garply Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
    });
  });
});

describe('generateInstalledImage', () => {
  it('renders an image for installed Snaps', async () => {
    const image = await generateInstalledImage([
      getMockSnap({ name: 'Foo Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Bar Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Baz Snap', icon: DEFAULT_SNAP_ICON }).snap,
      getMockSnap({ name: 'Qux Snap', icon: DEFAULT_SNAP_ICON }).snap,
    ]);

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIRECTORY,
      failureThreshold: 100,
    });
  });
});
