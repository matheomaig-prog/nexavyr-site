/* ===== NEXAVYR — bascule de langue FR/EN (façon KAIRO) =====
   Méthode : chaque texte traduisible porte un attribut data-en="..." (et data-en-ph
   pour les placeholders). Le texte FR reste dans le HTML. Le script mémorise le FR
   au premier passage, puis bascule l'innerHTML FR <-> EN. Choix gardé en localStorage. */
(function () {
  function getLang() {
    try { return localStorage.getItem('nx_lang'); } catch (e) { return null; }
  }
  function setLang(l) {
    try { localStorage.setItem('nx_lang', l); } catch (e) {}
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.getAttribute('data-fr') === null) el.setAttribute('data-fr', el.innerHTML);
      el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-fr');
    });

    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (el.getAttribute('data-fr-ph') === null) el.setAttribute('data-fr-ph', el.getAttribute('placeholder') || '');
      el.setAttribute('placeholder', (lang === 'en') ? el.getAttribute('data-en-ph') : el.getAttribute('data-fr-ph'));
    });

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.innerHTML = (lang === 'en') ? '🌐 EN' : '🌐 FR';
      b.setAttribute('aria-label', (lang === 'en') ? 'Switch to French' : 'Passer en anglais');
    });

    setLang(lang);
  }

  window.nxToggleLang = function () {
    apply((getLang() === 'en') ? 'fr' : 'en');
  };

  function init() { apply(getLang() === 'en' ? 'en' : 'fr'); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
