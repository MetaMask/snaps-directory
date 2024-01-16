const KNOWN_LINKS = [
  {
    name: 'GitHub',
    url: 'github.com',
  },
  {
    name: 'GitLab',
    url: 'gitlab.com',
  },
  {
    name: 'Bitbucket',
    url: 'bitbucket.org',
  },
  {
    name: 'Notion',
    url: 'notion.so',
  },
  {
    name: 'Discord',
    url: 'discord.com',
  },
  {
    name: 'Discord',
    url: 'discord.gg',
  },
  {
    name: 'Telegram',
    url: 't.me',
  },
];

/**
 * Get the link text for a given URL. If the URL is a known link, the name of
 * the link will be returned. Otherwise, either the host will be returned or
 * a specified fallback value.
 *
 * @param url - The URL to get the link text for.
 * @param fallback - An optional fallback value if the url is not well known.
 * @returns The link text.
 */
export function getLinkText(url: string, fallback?: string) {
  try {
    const { host } = new URL(url);

    const link = KNOWN_LINKS.find((knownLink) => host === knownLink.url);
    if (link) {
      return link.name;
    }

    return fallback ?? host;
  } catch {
    return fallback ?? url;
  }
}
