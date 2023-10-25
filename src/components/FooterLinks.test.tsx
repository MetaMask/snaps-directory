import { render } from '../utils/test-utils';
import { FooterLinks } from './FooterLinks';

describe('FooterLinks', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterLinks />);

    expect(queryByText('About')).toBeInTheDocument();
    expect(queryByText('Get in touch')).toBeInTheDocument();
    expect(queryByText('Website')).toBeInTheDocument();
    expect(queryByText('Contact Us')).toBeInTheDocument();
  });
});
