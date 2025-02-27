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

    expect(queryByText('Privacy policy')).toBeInTheDocument();
    expect(queryByText('Terms of use')).toBeInTheDocument();
  });
});
