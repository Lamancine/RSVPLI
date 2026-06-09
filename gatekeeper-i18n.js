// Internationalization for Gatekeeper Page
// Supports: English, French, Greek

const translations = {
  en: {
    welcome: "Welcome",
    to_our_wedding: "To Our Wedding",
    enter_name_prompt: "Please enter your name to access the wedding details.",
    enter_your_name: "Enter your name",
    verify_and_enter: "Verify & Enter",
    verifying: "Verifying...",
    guest_list_note: "Make sure you are on our guest list.",
    child_free_notice: "This is a child-free wedding celebration. We appreciate your understanding.",
    guest_not_found: "Name not found. Please check the spelling and try again.",
    loading_guests: "Loading guest list...",
    error_loading: "Error loading guest list. Please try again."
  },
  fr: {
    welcome: "Bienvenue",
    to_our_wedding: "À Notre Mariage",
    enter_name_prompt: "Veuillez entrer votre nom pour accéder aux détails du mariage.",
    enter_your_name: "Entrez votre nom",
    verify_and_enter: "Vérifier & Entrer",
    verifying: "Vérification...",
    guest_list_note: "Assurez-vous d'être sur notre liste d'invités.",
    child_free_notice: "Ceci est une célébration de mariage sans enfants. Nous apprécions votre compréhension.",
    guest_not_found: "Nom non trouvé. Veuillez vérifier l'orthographe et réessayer.",
    loading_guests: "Chargement de la liste des invités...",
    error_loading: "Erreur lors du chargement de la liste des invités. Veuillez réessayer."
  },
  el: {
    welcome: "Καλώς ήρθατε",
    to_our_wedding: "Στο Γάμο Μας",
    enter_name_prompt: "Παρακαλώ εισάγετε το όνομά σας για πρόσβαση στις λεπτομέρειες του γάμου.",
    enter_your_name: "Εισάγετε το όνομά σας",
    verify_and_enter: "Επαλήθευση & Είσοδος",
    verifying: "Επαλήθευση...",
    guest_list_note: "Βεβαιωθείτε ότι είστε στη λίστα των προσκεκλημένων μας.",
    child_free_notice: "Αυτός είναι ένας γάμος χωρίς παιδιά. Εκτιμούμε την κατανόησή σας.",
    guest_not_found: "Το όνομα δεν βρέθηκε. Παρακαλώ ελέγξτε την ορθογραφία και δοκιμάστε ξανά.",
    loading_guests: "Φόρτωση λίστας προσκεκλημένων...",
    error_loading: "Σφάλμα φόρτωσης λίστας προσκεκλημένων. Παρακαλώ δοκιμάστε ξανά."
  }
};

// Get browser's language
function getDetectedLanguage() {
  // Get browser language and convert to our supported languages
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Map browser language codes to our supported languages
  const langMap = {
    'en': 'en',
    'fr': 'fr',
    'el': 'el',
    'gr': 'el',  // Greek variants
    'ga': 'el'   // Map various Greek codes
  };
  
  return langMap[langCode] || 'en'; // Default to English
}

// Current language (will be set during initialization)
let currentLanguage = 'en';

// Initialize language
function initLanguage() {
  // Check if language was saved in localStorage
  const savedLang = localStorage.getItem('_wedding_language');
  if (savedLang && Object.keys(translations).includes(savedLang)) {
    currentLanguage = savedLang;
  } else {
    // Otherwise, detect from browser
    currentLanguage = getDetectedLanguage();
    localStorage.setItem('_wedding_language', currentLanguage);
  }
  
  // Update UI
  updateLanguageUI();
  translatePage();
}

// Set language
function setLanguage(lang) {
  if (Object.keys(translations).includes(lang)) {
    currentLanguage = lang;
    localStorage.setItem('_wedding_language', currentLanguage);
    updateLanguageUI();
    translatePage();
  }
}

// Update language button UI
function updateLanguageUI() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

// Translate page content
function translatePage() {
  const dict = translations[currentLanguage];
  
  // Translate elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });
  
  // Translate placeholders with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      elem.placeholder = dict[key];
    }
  });
}

// Get translation for a key
function t(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  // If DOMContentLoaded already fired
  initLanguage();
}
