import { Tag, TagLabel } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { hasProperty } from '@metamask/utils';
import type { FunctionComponent } from 'react';

import { FilterTag } from './FilterTag';
import { CloseIcon } from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import type { Order } from '../constants';
import { SNAP_ORDER_LABELS } from '../constants';
import {
  getCategories,
  getInstalled,
  getOrder,
  toggleInstalled,
} from '../store';

export const FilterTags: FunctionComponent = () => {
  const i18n = useLingui();
  const dispatch = useDispatch();
  const installed = useSelector(getInstalled);
  const categories = useSelector(getCategories);
  const order = useSelector(getOrder);

  const handleClickInstalled = () => {
    dispatch(toggleInstalled());
  };

  return (
    <>
      {hasProperty(SNAP_ORDER_LABELS, order) && (
        <Tag
          variant="category"
          background="success.muted"
          color="success.default"
        >
          <TagLabel>
            {i18n._(
              SNAP_ORDER_LABELS[
                order as Order.Popularity | Order.Alphabetical | Order.Latest
              ],
            )}
          </TagLabel>
        </Tag>
      )}
      {categories.map((category) => (
        <FilterTag key={category} category={category} />
      ))}
      {installed && (
        <Tag
          variant="category"
          background="success.muted"
          color="success.default"
        >
          <TagLabel>
            <Trans>Installed</Trans>
          </TagLabel>
          <CloseIcon
            data-testid="filter-installed-close"
            onClick={handleClickInstalled}
            cursor="pointer"
            marginLeft="1.5"
            width="0.6875rem"
          />
        </Tag>
      )}
    </>
  );
};
