import { Category } from './Category';
import { RegistrySnapCategory } from '../../../constants';
import { render } from '../../../utils/test-utils';

describe('Category', () => {
  it('renders the correct category name', () => {
    const { queryByText } = render(
      <Category category={RegistrySnapCategory.TransactionInsights} />,
    );

    expect(queryByText('Security')).toBeInTheDocument();
  });
});
