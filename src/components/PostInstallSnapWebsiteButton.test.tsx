import { beforeEach } from '@jest/globals';

import { PostInstallSnapWebsiteButton } from './PostInstallSnapWebsiteButton';
import * as analytics from '../analytics';
import { SnapEventType, SnapWebsiteOrigin } from '../analytics';
import { render } from '../utils/test-utils';

describe('PostInstallSnapWebsiteButton', () => {
  beforeEach(() => {
    jest.spyOn(analytics, 'track').mockImplementation();
  });

  it('renders', () => {
    const { queryByText } = render(
      <PostInstallSnapWebsiteButton
        snapId="test"
        website="https://example.com"
      />,
    );

    expect(queryByText('example.com')).toBeInTheDocument();
  });

  it('renders with a pathname', () => {
    const { queryByText } = render(
      <PostInstallSnapWebsiteButton
        snapId="test"
        website="https://example.com/path"
      />,
    );

    expect(queryByText('example.com/path')).toBeInTheDocument();
  });

  it('renders the original URL if the URL is invalid', () => {
    const { queryByText } = render(
      <PostInstallSnapWebsiteButton snapId="test" website="invalid" />,
    );

    expect(queryByText('invalid')).toBeInTheDocument();
  });

  it('triggers an event when clicked', () => {
    const { getByText } = render(
      <PostInstallSnapWebsiteButton
        snapId="test"
        website="https://example.com"
      />,
    );

    const link = getByText('example.com');
    link.click();

    expect(analytics.track).toHaveBeenCalledWith({
      type: SnapEventType.Website,
      snapId: 'test',
      origin: SnapWebsiteOrigin.Modal,
    });
  });
});
