import { RelatedSnaps } from './RelatedSnaps';
import { RegistrySnapCategory } from '../../../constants';
import { render } from '../../../utils/test-utils';

describe('RelatedSnaps', () => {
  it('renders', () => {
    const { queryByText } = render(
      <RelatedSnaps
        snapId="foo"
        category={RegistrySnapCategory.Interoperability}
      />,
    );

    expect(queryByText('Related Snaps')).toBeInTheDocument();
  });
});
