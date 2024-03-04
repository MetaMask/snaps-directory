import { messages as german } from './de-DE/messages';
import { messages as english } from './en-US/messages';
import { messages as japanese } from './ja-JP/messages';
import { messages as portuguese } from './pt-BR/messages';
import { messages as russian } from './ru-RU/messages';
import { messages as turkish } from './tr-TR/messages';
import { messages as chinese } from './zh-CN/messages';

export const LOCALES = [
  { label: 'Deutsch', locale: 'de-DE', alternatives: ['de'], messages: german },
  {
    label: 'English',
    locale: 'en-US',
    alternatives: ['en'],
    messages: english,
  },
  {
    label: '日本語',
    locale: 'ja-JP',
    alternatives: ['ja'],
    messages: japanese,
  },
  {
    label: 'Português',
    locale: 'pt-BR',
    alternatives: ['pt'],
    messages: portuguese,
  },
  {
    label: 'Русский',
    locale: 'ru-RU',
    alternatives: ['ru'],
    messages: russian,
  },
  {
    label: 'Türkçe',
    locale: 'tr-TR',
    alternatives: ['tr'],
    messages: turkish,
  },
  {
    label: '中文',
    locale: 'zh-CN',
    alternatives: ['zh'],
    messages: chinese,
  },
];

export const DEFAULT_LOCALE = 'en-US';
