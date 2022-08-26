import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

/* eslint-disable */
function getCookie(name) {
  /* eslint-disable */
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function loadLocaleMessages() {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
export const current_language = getCookie('lang') || 'ru';
export default new VueI18n({
  locale: current_language,
  fallbackLocale: 'ru',
  messages: loadLocaleMessages(),
});
