import { Flex, Text, Tooltip } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { WarningIcon } from '../../../components';

export type SnapDataProps = {
  label: string;
  value: ReactNode;
  warning?: ReactNode | undefined;
};

export const Data: FunctionComponent<SnapDataProps> = ({
  label,
  value,
  warning,
}) => (
  <Flex flexDirection="column">
    <Flex marginBottom="1" gap="1">
      <Text
        color={warning ? 'warning.default' : 'text.alternative'}
        fontWeight="medium"
        fontSize="sm"
        textTransform="uppercase"
      >
        {label}
      </Text>
      {warning && (
        <Tooltip label={warning} placement="auto-end">
          <WarningIcon width="20px" fill="warning.default" />
        </Tooltip>
      )}
    </Flex>
    {value}
  </Flex>
);
