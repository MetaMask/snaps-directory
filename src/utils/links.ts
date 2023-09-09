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
    name: 'Telegram',
    url: 't.me',
  },
];

/**
 * Get the link text for a given URL. If the URL is a known link, the name of
 * the link will be returned. Otherwise, the host will be returned, optionally
 * with the path.
 *
 * @param url - The URL to get the link text for.
 * @param includePath - Whether to include the path in the link text. Defaults
 * to false.
 * @returns The link text.
 */
export function getLinkText(url: string, includePath = false) {
  const { host, pathname } = new URL(url);

  const link = KNOWN_LINKS.find((knownLink) => host.endsWith(knownLink.url));
  if (link) {
    return link.name;
  }

  if (includePath) {
    const path = pathname === '/' ? '' : pathname;
    return host + path;
  }

  return host;
}
