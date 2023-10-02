import { FooterLinks } from './FooterLinks';
import { render } from '../utils/test-utils';

describe('FooterLinks', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterLinks />);

    expect(queryByText('About')).toBeInTheDocument();
    expect(queryByText('Get in touch')).toBeInTheDocument();
    expect(queryByText('Website')).toBeInTheDocument();
    expect(queryByText('Contact Us')).toBeInTheDocument();
  });
});
