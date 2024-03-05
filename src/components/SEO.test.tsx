import { SEO } from './SEO';
import { render } from '../utils/test-utils';

describe('SEO', () => {
  it('renders', () => {
    expect(() => render(<SEO locale="en" />)).not.toThrow();
  });
});
