import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

type SnapPageProps = {
  data: {
    snap: Queries.Snap;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => (
  <h1>{data.snap.name}</h1>
);

export const query = graphql`
  query ($id: String) {
    snap(id: { eq: $id }) {
      name
    }
  }
`;

export default SnapPage;
