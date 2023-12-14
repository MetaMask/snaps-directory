import { Metadata } from './Metadata';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('Metadata', () => {
  it('renders the category', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(<Metadata snap={snap} />);

    expect(queryByText('Category')).toBeInTheDocument();
    expect(queryByText('Security')).toBeInTheDocument();
  });

  it('renders the developer', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(<Metadata snap={snap} />);

    expect(queryByText('Developer')).toBeInTheDocument();
    expect(queryByText('Author')).toBeInTheDocument();
  });
});
