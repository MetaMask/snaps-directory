import { Flex, Heading, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import {
  type RegistrySnapCategory,
  SNAP_CATEGORY_LINKS,
} from '../../../constants';
import { Order } from '../../filter/constants';
import { FilteredSnaps } from '../../snaps';

export type RelatedSnapsProps = {
  snapId: string;
  category: RegistrySnapCategory;
};

export const RelatedSnaps: FunctionComponent<RelatedSnapsProps> = ({
  snapId,
  category,
}) => {
  const i18n = useLingui();

  return (
    <>
      <Flex
        width="100%"
        marginBottom="4"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" fontSize="2xl">
          <Trans>Related Snaps</Trans>
        </Heading>
        <Link
          as={GatsbyLink}
          to={SNAP_CATEGORY_LINKS[category].link}
          variant="landing"
        >
          {i18n._(SNAP_CATEGORY_LINKS[category].linkText)}
        </Link>
      </Flex>
      <FilteredSnaps
        limit={3}
        category={category}
        order={Order.Random}
        excluded={[snapId]}
        images={true}
      />
    </>
  );
};
