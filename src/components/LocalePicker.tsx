import { Select } from '@chakra-ui/react';
import type { ChangeEvent, FunctionComponent } from 'react';

import { DropdownIcon } from './icons';
import { useLocale } from '../hooks';
import { LOCALES } from '../locales';

export const LocalePicker: FunctionComponent = () => {
  const { locale, setLocale } = useLocale();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <Select
      variant="unstyled"
      width="auto"
      fontSize="md"
      fontWeight="500"
      color="info.default"
      textAlign="right"
      icon={<DropdownIcon width="0.9375rem" fill="info.default" />}
      value={locale}
      onChange={handleChange}
    >
      {LOCALES.map((item) => (
        <option key={item.locale} value={item.locale}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};
