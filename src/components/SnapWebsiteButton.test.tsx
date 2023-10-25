import { beforeEach } from '@jest/globals';

import { SnapEventType, SnapWebsiteOrigin } from '../analytics';
import * as analytics from '../analytics';
import { render } from '../utils/test-utils';
import { SnapWebsiteButton } from './SnapWebsiteButton';

describe('SnapWebsiteButton', () => {
  beforeEach(() => {
    jest.spyOn(analytics, 'track').mockImplementation();
  });

  it('renders', () => {
    const { queryByText } = render(
      <SnapWebsiteButton snapId="test" website="https://example.com" />,
    );

    expect(queryByText('Website')).toBeInTheDocument();
  });

  it('triggers an event when clicked', () => {
    const { getByText } = render(
      <SnapWebsiteButton snapId="test" website="https://example.com" />,
    );

    const link = getByText('Website');
    link.click();

    expect(analytics.track).toHaveBeenCalledWith({
      type: SnapEventType.Website,
      snapId: 'test',
      origin: SnapWebsiteOrigin.Button,
    });
  });
});
