import { Layout } from './src/components';
// eslint-disable-next-line import/no-unassigned-import
import './src/assets/fonts/fonts.css';

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Layout {...props}>{element}</Layout>
    </>
  );
};
