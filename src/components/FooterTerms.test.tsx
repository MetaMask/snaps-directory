import { FooterTerms } from './FooterTerms';
import { render } from '../utils/test-utils';

describe('FooterTerms', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterTerms />);

    expect(queryByText('Consensys Terms of Use')).toBeInTheDocument();
  });
});
