import { Legal } from './Legal';
import { render } from '../../../utils/test-utils';

describe('Legal', () => {
  it('renders', () => {
    const { queryByText } = render(
      <Legal
        privacyPolicy="https://metamask.io"
        termsOfUse="https://metamask.io"
      />,
    );

    expect(queryByText('Privacy Policy')).toBeInTheDocument();
    expect(queryByText('Terms of Use')).toBeInTheDocument();
  });
});
