import { FooterAccountManagementTerms } from './FooterAccountManagementTerms';
import { render } from '../utils/test-utils';

describe('FooterAccountManagementTerms', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterAccountManagementTerms />);

    expect(queryByText('Experimental Beta')).toBeInTheDocument();
  });
});
