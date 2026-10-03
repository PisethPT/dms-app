import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import km from './locales/km.json'
import cn from './locales/cn.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('dms_lang') || 'en',
  fallbackLocale: 'en',
  messages: { en, km, cn },
})

export default i18n
