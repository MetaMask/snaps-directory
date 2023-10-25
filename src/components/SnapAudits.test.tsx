import { render } from '../utils/test-utils';
import { SnapAudits } from './SnapAudits';

describe('SnapAudits', () => {
  it('renders the auditor', () => {
    const { queryByText } = render(
      <SnapAudits
        audits={[
          {
            auditor: 'foo',
            report: 'https://example.com/foo',
          },
        ]}
      />,
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });

  it('renders a single report', () => {
    const { queryByText } = render(
      <SnapAudits
        audits={[
          {
            auditor: 'foo',
            report: 'https://example.com/foo',
          },
        ]}
      />,
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });

  it('renders multiple reports', () => {
    const { queryByText } = render(
      <SnapAudits
        audits={[
          {
            auditor: 'bar',
            report: 'https://example.com/foo',
          },
          {
            auditor: 'bar',
            report: 'https://example.com/bar',
          },
        ]}
      />,
    );

    expect(queryByText('bar', { exact: false })).toBeInTheDocument();
    expect(queryByText('[1]')).toBeInTheDocument();
    expect(queryByText('[2]')).toBeInTheDocument();
  });
});
