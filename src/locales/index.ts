import { messages as german } from './de-DE/messages';
import { messages as english } from './en-US/messages';
import { messages as japanese } from './ja-JP/messages';
import { messages as portuguese } from './pt-BR/messages';
import { messages as russian } from './ru-RU/messages';
import { messages as turkish } from './tr-TR/messages';
import { messages as chinese } from './zh-CN/messages';

export const LOCALES = [
  { locale: 'de-DE', messages: german },
  { locale: 'en-US', messages: english },
  { locale: 'ja-JP', messages: japanese },
  { locale: 'pt-BR', messages: portuguese },
  { locale: 'ru-RU', messages: russian },
  { locale: 'tr-TR', messages: turkish },
  { locale: 'zh-CN', messages: chinese },
];

export const DEFAULT_LOCALE = 'en-US';
