import { SnapEventType, track } from './analytics';

describe('track', () => {
  it('tracks the event', () => {
    const fn = jest.fn();

    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(window, 'analytics', {
      value: {
        track: fn,
      },
    });

    track({
      type: SnapEventType.Installed,
      snapId: 'foo',
      version: '1.0.0',
    });

    expect(fn).toHaveBeenCalledWith(SnapEventType.Installed, {
      snapId: 'foo',
      version: '1.0.0',
    });
  });
});
