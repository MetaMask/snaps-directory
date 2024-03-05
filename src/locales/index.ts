import { messages as german } from './de-DE/messages';
import { messages as english } from './en-US/messages';
import { messages as japanese } from './ja-JP/messages';
import { messages as portuguese } from './pt-BR/messages';
import { messages as russian } from './ru-RU/messages';
import { messages as turkish } from './tr-TR/messages';
import { messages as chinese } from './zh-CN/messages';

export const LOCALES = [
  { label: 'Deutsch', locale: 'de-DE', messages: german },
  {
    label: 'English',
    locale: 'en-US',
    messages: english,
  },
  {
    label: '日本語',
    locale: 'ja-JP',
    messages: japanese,
  },
  {
    label: 'Português',
    locale: 'pt-BR',
    messages: portuguese,
  },
  {
    label: 'Русский',
    locale: 'ru-RU',
    messages: russian,
  },
  {
    label: 'Türkçe',
    locale: 'tr-TR',
    messages: turkish,
  },
  {
    label: '中文',
    locale: 'zh-CN',
    messages: chinese,
  },
];

export const LOCALE_CODES = LOCALES.map(({ locale }) => locale);

export const DEFAULT_LOCALE = 'en-US';
