import { SnapCategory } from './SnapCategory';
import { RegistrySnapCategory } from '../constants';
import { render } from '../utils/test-utils';

describe('SnapCategory', () => {
  it('renders the correct category name', () => {
    const { queryByText } = render(
      <SnapCategory category={RegistrySnapCategory.TransactionInsights} />,
    );

    expect(queryByText('Transaction Insights')).toBeInTheDocument();
  });
});
