// Internationalization System for Wedding Website
// Supports: English, French, Greek
// Content is loaded from content.json

let pageTranslations = {};
let translationsReady = false;

/**
 * Load page translations from content.json
 */
async function loadPageTranslations() {
  try {
    const response = await fetch('content.json');
    pageTranslations = await response.json();
    translationsReady = true;
    // Fire event when translations are ready
    document.dispatchEvent(new CustomEvent('translationsLoaded'));
    return true;
  } catch (error) {
    console.warn('Could not load content.json, using defaults:', error);
    // Provide fallback translations (basic structure)
    pageTranslations = {
      en: { lang_en: "EN", lang_fr: "FR", lang_el: "ΕΛ", days_to_go: "days" },
      fr: { lang_en: "EN", lang_fr: "FR", lang_el: "EL", days_to_go: "jours" },
      el: { lang_en: "EN", lang_fr: "FR", lang_el: "EL", days_to_go: "ημέρες" }
    };
    translationsReady = true;
    document.dispatchEvent(new CustomEvent('translationsLoaded'));
    return false;
  }
}

// Current language (will be set during initialization)
let currentLanguage = 'en';

// Get browser's language
function getDetectedLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  const langMap = {
    'en': 'en',
    'fr': 'fr',
    'el': 'el',
    'gr': 'el',
    'ga': 'el'
  };
  
  return langMap[langCode] || 'en';
}

// Initialize language
async function initLanguage() {
  // Load translations from content.json
  await loadPageTranslations();
  
  const savedLang = localStorage.getItem('_wedding_language');
  if (savedLang && Object.keys(pageTranslations).includes(savedLang)) {
    currentLanguage = savedLang;
  } else {
    currentLanguage = getDetectedLanguage();
    localStorage.setItem('_wedding_language', currentLanguage);
  }
  
  updateLanguageUI();
  translatePage();
}

// Set language
function setLanguage(lang) {
  if (Object.keys(pageTranslations).includes(lang)) {
    currentLanguage = lang;
    localStorage.setItem('_wedding_language', currentLanguage);
    updateLanguageUI();
    translatePage();
    // Trigger countdown update when language changes
    document.dispatchEvent(new CustomEvent('languageChanged'));
  }
}

// Update language button UI
function updateLanguageUI() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

// Translate page content
function translatePage() {
  const dict = pageTranslations[currentLanguage];
  
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.innerHTML = dict[key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      elem.placeholder = dict[key];
    }
  });
}

// Get translation for a key
function t(key) {
  return pageTranslations[currentLanguage][key] || pageTranslations['en'][key] || key;
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
