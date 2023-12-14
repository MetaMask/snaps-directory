import { Data } from './Data';
import { render } from '../../../utils/test-utils';

describe('Data', () => {
  it('renders', () => {
    const { queryByText } = render(<Data label="Label" value="Value" />);

    expect(queryByText('Label')).toBeInTheDocument();
    expect(queryByText('Value')).toBeInTheDocument();
  });
});
