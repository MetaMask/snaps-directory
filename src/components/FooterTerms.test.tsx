import { render } from '../utils/test-utils';
import { FooterTerms } from './FooterTerms';

describe('FooterTerms', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterTerms />);

    expect(queryByText('Consensys Terms of Use')).toBeInTheDocument();
  });
});
