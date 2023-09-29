import { describe, it, expect } from '@jest/globals';

import { getLinkText } from './links';

describe('getLinkText', () => {
  it('returns the link text for a known link', () => {
    expect(getLinkText('https://github.com')).toBe('GitHub');
    expect(getLinkText('https://gitlab.com')).toBe('GitLab');
    expect(getLinkText('https://bitbucket.org')).toBe('Bitbucket');
    expect(getLinkText('https://notion.so')).toBe('Notion');
    expect(getLinkText('https://discord.com')).toBe('Discord');
    expect(getLinkText('https://discord.gg')).toBe('Discord');
    expect(getLinkText('https://t.me')).toBe('Telegram');
  });

  it('returns the host for an unknown link', () => {
    expect(getLinkText('https://example.com')).toBe('example.com');
  });

  it('returns the fallback value for an unknown link', () => {
    expect(getLinkText('https://example.com', 'Example')).toBe('Example');
  });

  it('returns the host for an invalid URL', () => {
    expect(getLinkText('not a url')).toBe('not a url');
  });

  it('returns the fallback value for an invalid URL', () => {
    expect(getLinkText('not a url', 'Example')).toBe('Example');
  });
});
