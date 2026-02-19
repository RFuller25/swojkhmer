(function () {
  'use strict';
  var STORAGE_KEY = 'swoj-lang';

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'km'; }
    catch (e) { return 'km'; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-km]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });
    document.documentElement.lang = lang;
    document.body.classList.remove('lang-km', 'lang-en');
    document.body.classList.add('lang-' + lang);
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.setAttribute('data-current', lang);
      btn.setAttribute('aria-label', lang === 'km' ? 'Switch to English' : 'ប្តូរភាសាខ្មែរ');
    });
  }

  function toggle() {
    var next = getLang() === 'km' ? 'en' : 'km';
    saveLang(next);
    applyLang(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
    applyLang(getLang());
  });
})();
