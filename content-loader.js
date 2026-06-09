// Charge les textes personnalisés depuis GitHub (pas de rebuild Netlify nécessaire)
fetch('https://raw.githubusercontent.com/Lamancine/RSVPLI/main/_data/texts.json')
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
