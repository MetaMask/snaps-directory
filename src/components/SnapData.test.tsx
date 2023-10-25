import { render } from '../utils/test-utils';
import { SnapData } from './SnapData';

describe('SnapData', () => {
  it('renders', () => {
    const { queryByText } = render(
      <SnapData
        label="Label"
        value="Value"
        order={{ base: 1, md: 2, lg: 3 }}
      />,
    );

    expect(queryByText('Label')).toBeInTheDocument();
    expect(queryByText('Value')).toBeInTheDocument();
  });
});
