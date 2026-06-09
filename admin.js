/**
 * Wedding Admin Panel - Content Management
 */

// Configuration
const ADMIN_PASSWORD = 'wedding2026'; // Change this to your desired password
const ADMIN_SESSION_KEY = '_wedding_admin_session';
const CONTENT_API_URL = 'https://script.google.com/macros/s/AKfycbwlsM30cORGwtFht9vccDpKctuRFgHIGPTgMH6ts50MsETvcmCQalAJoQExhcj6yxkW/exec';
const CONTENT_API_TOKEN = 'vf3a9c6d2b8e14f7a9c3d5e6f1a2b4c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4';

// Content structure for organizing fields by section
const CONTENT_SECTIONS = {
  'Hero & Navigation': [
    'lang_en', 'lang_fr', 'lang_el', 'wedding_date', 'days_to_go',
    'nav_home', 'nav_venue', 'nav_accommodation', 'nav_faq', 'nav_rsvp', 'nav_logout'
  ],
  'Home Page': [
    'hero_title', 'hero_subtitle', 'hero_date', 'hero_cta', 'countdown_label', 'story_heading',
    'welcome_heading', 'welcome_text_1', 'welcome_text_2', 'child_free_notice',
    'quick_links_venue', 'quick_links_venue_desc', 'quick_links_venue_btn',
    'quick_links_accommodation', 'quick_links_accommodation_desc', 'quick_links_accommodation_btn',
    'quick_links_faq', 'quick_links_faq_desc', 'quick_links_faq_btn'
  ],
  'Venue Page': [
    'venue_heading', 'venue_intro', 'venue_date_time', 'venue_location',
    'venue_address_label', 'venue_address', 'venue_arrival_time', 'venue_ceremony_time',
    'venue_cocktail_time', 'venue_parking', 'venue_parking_desc', 'venue_spaces',
    'venue_spaces_desc', 'venue_amenities', 'venue_details_title', 'venue_description'
  ],
  'Accommodation Page': [
    'accommodation_heading', 'accommodation_intro',
    'hotel_1_name', 'hotel_1_rating', 'hotel_1_distance', 'hotel_1_amenities', 'hotel_1_rate', 'hotel_1_contact',
    'hotel_2_name', 'hotel_2_rating', 'hotel_2_distance', 'hotel_2_amenities', 'hotel_2_rate', 'hotel_2_contact',
    'hotel_3_name', 'hotel_3_rating', 'hotel_3_distance', 'hotel_3_amenities', 'hotel_3_rate', 'hotel_3_contact',
    'booking_info_title', 'booking_step_1', 'booking_step_2', 'booking_step_3', 'booking_step_4',
    'alternative_stays_title', 'alternative_stays_desc'
  ],
  'FAQ Page': [
    'faq_heading',
    'faq_q1', 'faq_a1', 'faq_q2', 'faq_a2', 'faq_q3', 'faq_a3',
    'faq_q4', 'faq_a4', 'faq_q5', 'faq_a5', 'faq_q6', 'faq_a6',
    'faq_q7', 'faq_a7', 'faq_q8', 'faq_a8', 'faq_q9', 'faq_a9',
    'faq_q10', 'faq_a10', 'faq_q11', 'faq_a11', 'faq_q12', 'faq_a12'
  ],
  'RSVP Page': [
    'rsvp_heading', 'rsvp_intro', 'rsvp_name_label', 'rsvp_dietary_label',
    'rsvp_dietary_none', 'rsvp_dietary_vegetarian', 'rsvp_dietary_vegan', 'rsvp_dietary_gluten_free',
    'rsvp_attendance_label', 'rsvp_attendance_yes', 'rsvp_attendance_no', 'rsvp_attendance_maybe',
    'rsvp_message_label', 'rsvp_message_placeholder', 'rsvp_review_btn', 'rsvp_language_label',
    'rsvp_thank_you_title', 'rsvp_thank_you_msg', 'rsvp_error'
  ],
  'Footer': ['footer_text'],
  'Gatekeeper Page': [
    'welcome', 'enter_name_prompt', 'verify_and_enter', 'verifying', 'guest_list_note'
  ]
};

// Global state
let contentData = {};
let currentLanguage = 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAdminSession();
  loadContent();
});

// Check if admin is logged in
function checkAdminSession() {
  const isLoggedIn = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  if (isLoggedIn) {
    showAdminPanel();
  } else {
    showLoginPanel();
  }
}

// Show login panel
function showLoginPanel() {
  document.getElementById('loginContainer').classList.add('active');
  document.getElementById('adminContainer').classList.remove('active');
  document.getElementById('passwordInput').focus();
}

// Show admin panel
function showAdminPanel() {
  document.getElementById('loginContainer').classList.remove('active');
  document.getElementById('adminContainer').classList.add('active');
}

// Admin login
function adminLogin() {
  const password = document.getElementById('passwordInput').value;
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    showAdminPanel();
    loadContent();
  } else {
    showNotification('Incorrect password', 'error');
    document.getElementById('loginError').classList.add('active');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordInput').focus();
  }
}

// Admin logout
function adminLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  document.getElementById('passwordInput').value = '';
  showLoginPanel();
  document.getElementById('loginError').classList.remove('active');
}

// Fetch the published content from the remote API, if configured
async function fetchPublishedContent() {
  if (!CONTENT_API_URL || CONTENT_API_URL.includes('YOUR_DEPLOYMENT_ID')) {
    return null;
  }

  try {
    const response = await fetch(CONTENT_API_URL);
    if (!response.ok) {
      throw new Error(`Remote fetch failed: ${response.status}`);
    }

    const result = await response.json();
    if (result && result.status === 'success' && result.content) {
      return result.content;
    }

    return null;
  } catch (error) {
    console.warn('Could not load published content:', error);
    return null;
  }
}

async function loadPublishedContent() {
  const publishedContent = await fetchPublishedContent();
  if (!publishedContent) {
    showNotification('Published content unavailable. Using local content.', 'error');
    return false;
  }

  contentData = publishedContent;
  renderForms();
  showNotification('Published content loaded successfully.', 'success');
  return true;
}

async function publishContent() {
  saveContent();

  if (!CONTENT_API_URL || CONTENT_API_URL.includes('YOUR_DEPLOYMENT_ID')) {
    showNotification('Publish URL is not configured in admin.js.', 'error');
    return;
  }

  if (!CONTENT_API_TOKEN || CONTENT_API_TOKEN === 'REPLACE_WITH_TOKEN') {
    showNotification('Publish token is not configured in admin.js.', 'error');
    return;
  }

  try {
    const response = await fetch(CONTENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'content',
        token: CONTENT_API_TOKEN,
        content: contentData
      })
    });

    const result = await response.json();
    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Unknown publish error');
    }

    showNotification('Content published live successfully!', 'success');
  } catch (error) {
    console.error('Publish failed:', error);
    showNotification(`Publish failed: ${error.message}`, 'error');
  }
}

// Load content from content.json or browser storage
async function loadContent() {
  try {
    const savedContent = localStorage.getItem('_wedding_content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent && typeof parsedContent === 'object') {
          contentData = parsedContent;
          renderForms();
          showNotification('Loaded saved draft from browser storage.', 'success');
          return;
        }
      } catch (parseError) {
        console.warn('Invalid saved content in localStorage:', parseError);
      }
    }

    const publishedContent = await fetchPublishedContent();
    if (publishedContent) {
      contentData = publishedContent;
      renderForms();
      showNotification('Loaded published content from live site.', 'success');
      return;
    }

    const response = await fetch('content.json');
    contentData = await response.json();
    renderForms();
  } catch (error) {
    showNotification('Failed to load content. Make sure content.json exists.', 'error');
    console.error('Error loading content:', error);
  }
}

// Render form for current language
function renderForms() {
  const languages = ['en', 'fr', 'el'];
  
  languages.forEach(lang => {
    const formContainer = document.getElementById(`contentForm-${lang}`);
    formContainer.innerHTML = '';
    
    // Get all keys for this language, ordered by sections
    for (const [sectionName, keys] of Object.entries(CONTENT_SECTIONS)) {
      formContainer.innerHTML += `<div class="section-title">${sectionName}</div>`;
      
      // Render fields for this section
      keys.forEach(key => {
        if (!contentData[lang] || !contentData[lang].hasOwnProperty(key)) return;
        
        const value = contentData[lang][key];
        // Convert <br> tags back to newlines for editing in textareas
        const editValue = value.replace(/<br>/g, '\n');
        const isLongText = value.length > 100 || value.includes('<br>');
        
        const fieldHTML = `
          <div class="form-group">
            <label for="${key}-${lang}">${key}</label>
            ${isLongText ? 
              `<textarea id="${key}-${lang}" data-key="${key}" data-lang="${lang}">${escapeHtml(editValue)}</textarea>` :
              `<input type="text" id="${key}-${lang}" data-key="${key}" data-lang="${lang}" value="${escapeHtml(editValue)}" />`
            }
          </div>
        `;
        formContainer.innerHTML += fieldHTML;
      });
    }
  });

  document.querySelectorAll('input[data-key], textarea[data-key]').forEach(field => {
    field.addEventListener('input', handleContentInput);
  });

  renderPreview();
}

function handleContentInput(event) {
  const field = event.target;
  const key = field.getAttribute('data-key');
  const lang = field.getAttribute('data-lang');
  
  if (!key || !lang) return;
  if (!contentData[lang]) contentData[lang] = {};
  contentData[lang][key] = field.value.replace(/\n/g, '<br>');
  
  if (lang === currentLanguage) {
    renderPreview();
  }
}

function renderPreview() {
  const preview = document.getElementById('contentPreview');
  if (!preview) return;
  const currentContent = contentData[currentLanguage] || {};

  const formatPreviewText = (text = '') => escapeHtml(text).replace(/&lt;br&gt;/g, '<br>');

  preview.innerHTML = `
    <div class="preview-hero">
      <h2>${formatPreviewText(currentContent.hero_title || 'Hero Title')}</h2>
      <p>${formatPreviewText(currentContent.hero_subtitle || '')}</p>
      <p class="preview-date">${formatPreviewText(currentContent.hero_date || '')}</p>
      <div class="preview-cta">${formatPreviewText(currentContent.hero_cta || '')}</div>
    </div>
    <div class="preview-section">
      <h3>${formatPreviewText(currentContent.story_heading || 'Our Story')}</h3>
      <p>${formatPreviewText(currentContent.welcome_text_1 || '')}</p>
      <p>${formatPreviewText(currentContent.welcome_text_2 || '')}</p>
    </div>
    <div class="preview-section">
      <h3>${formatPreviewText(currentContent.quick_links_venue || 'Venue')}</h3>
      <p>${formatPreviewText(currentContent.quick_links_venue_desc || '')}</p>
      <p><strong>${formatPreviewText(currentContent.quick_links_accommodation || 'Stay Nearby')}</strong></p>
      <p>${formatPreviewText(currentContent.quick_links_accommodation_desc || '')}</p>
      <p><strong>${formatPreviewText(currentContent.quick_links_faq || 'Questions?')}</strong></p>
      <p>${formatPreviewText(currentContent.quick_links_faq_desc || '')}</p>
    </div>
  `;
}

// Switch language tab
function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update tab styling
  document.querySelectorAll('.lang-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`.lang-tab[data-lang="${lang}"]`).classList.add('active');
  
  // Show corresponding form section
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelector(`.form-section[data-lang="${lang}"]`).classList.add('active');
  
  renderPreview();
}

// Save content
function saveContent() {
  // Collect all form values
  document.querySelectorAll('input[data-key], textarea[data-key]').forEach(field => {
    const key = field.getAttribute('data-key');
    const lang = field.getAttribute('data-lang');
    
    if (!contentData[lang]) contentData[lang] = {};
    // Convert newlines to <br> tags for storage
    contentData[lang][key] = field.value.replace(/\n/g, '<br>');
  });
  
  // Save to localStorage so the draft persists in this browser
  localStorage.setItem('_wedding_content', JSON.stringify(contentData));
  
  renderPreview();
  showNotification('Content saved locally. Use Publish to update the live site.', 'success');
}

// Export content to JSON file
function exportContent() {
  // Ensure all content is saved first
  saveContent();
  
  const dataStr = JSON.stringify(contentData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `wedding-content-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showNotification('Content exported successfully!', 'success');
}

// Import content from JSON file
function importContent() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      contentData = imported;
      localStorage.setItem('_wedding_content', JSON.stringify(contentData));
      renderForms();
      showNotification('Content imported successfully!', 'success');
    } catch (error) {
      showNotification('Invalid JSON file. Please check the file format.', 'error');
      console.error('Error parsing JSON:', error);
    }
  };
  reader.readAsText(file);
  
  // Reset file input
  fileInput.value = '';
}

// Show notification
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification active ${type}`;
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    notification.classList.remove('active');
  }, 4000);
}

// Escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Allow Enter key to submit login (without making textarea break)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('loginContainer').classList.contains('active')) {
    const passwordInput = document.getElementById('passwordInput');
    if (document.activeElement === passwordInput) {
      adminLogin();
    }
  }
});
