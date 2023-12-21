import { Checkbox, Input } from '@chakra-ui/react';
import type { ChangeEvent, FunctionComponent } from 'react';

import type { Fields } from '../../../utils';

export type MethodInputProps = {
  value: string | number | boolean;
  param: Fields<Queries.SnapMethodsParamsMembers, 'name' | 'type'>;
  onChange: (name: string, value: string | number | boolean) => void;
};

export const MethodInput: FunctionComponent<MethodInputProps> = ({
  value,
  param,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (param.type) {
      case 'string':
        return onChange(param.name, event.target.value);
      case 'number':
        return onChange(param.name, Number(event.target.value));
      case 'boolean':
        return onChange(param.name, event.target.checked);
      default:
        return null;
    }
  };

  switch (param.type) {
    case 'string':
      return (
        <Input variant="simple" value={String(value)} onChange={handleChange} />
      );
    case 'number':
      return (
        <Input
          variant="simple"
          value={Number(value)}
          type="number"
          onChange={handleChange}
        />
      );
    case 'boolean':
      return (
        <Checkbox
          variant="simple"
          checked={Boolean(value)}
          onChange={handleChange}
        />
      );
    default:
      return null;
  }
};
