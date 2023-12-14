import { Audits } from './Audits';
import { render } from '../../../utils/test-utils';

describe('Audits', () => {
  it('renders the auditor', () => {
    const { queryByText } = render(
      <Audits
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
      <Audits
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
      <Audits
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
