// Charge les textes personnalisés depuis _data/texts.json
// et écrase les valeurs par défaut de i18n.js
fetch('_data/texts.json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    ['fr', 'en', 'el'].forEach(function(lang) {
      Object.keys(data).forEach(function(key) {
        if (key.endsWith('_' + lang) && data[key]) {
          var baseKey = key.slice(0, -(lang.length + 1));
          if (pageTranslations[lang]) {
            pageTranslations[lang][baseKey] = data[key];
          }
        }
      });
    });
    if (typeof translatePage === 'function') translatePage();
  })
  .catch(function() {});
