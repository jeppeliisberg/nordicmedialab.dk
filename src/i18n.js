import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import da from './locales/da.json';
import en from './locales/en.json';

// Language on first paint, in order of precedence:
//   1. ?lang=da / ?lang=en  — the static pages (federation.html, federation-da.html)
//      hand the language back this way, so a round trip does not reset to English.
//   2. the browser's own language, so a Danish visitor lands in Danish.
//   3. English.
const supported = ['da', 'en'];

const pickLanguage = () => {
  if (typeof window === 'undefined') return 'en';

  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (supported.includes(fromQuery)) return fromQuery;

  const preferred = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of preferred) {
    const base = String(tag || '').toLowerCase().split('-')[0];
    if (supported.includes(base)) return base;
  }

  return 'en';
};

const initialLng = pickLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      da: { translation: da },
      en: { translation: en }
    },
    lng: initialLng, // ?lang= > navigator.language > 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;