/**
 * Wedding Gatekeeper
 * Authenticates guests before allowing access to the website
 */

// ⚠️ CONFIGURE THIS:
// CSV URL of published Guest List (from Google Sheets "Guestlist" tab)
const GUESTLIST_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjPJpjVeFkcCbI5JdyQnn8P5EKpM_xugrpG7OOEmAhmewRw9qRkGlw_VwqltxBiXqQpjKpMNRmuB1s/pub?gid=1976428554&single=true&output=csv";

let guestRows = [];
let guestIndex = new Map();

// DOM Elements
const guestNameInput = document.getElementById("guestName");
const enterBtn = document.getElementById("enterBtn");
const errorMessage = document.getElementById("errorMessage");
const loadingIndicator = document.getElementById("loadingIndicator");

/**
 * Normalize name for comparison (remove accents, lowercase, trim)
 */
function normalizeName(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse CSV text to array of rows
 */
function csvToRows(csvText) {
  return csvText
    .trim()
    .split(/\r?\n/)
    .map(line => {
      const cells = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          cells.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      cells.push(current.trim());
      return cells;
    });
}

/**
 * Load guest list from Google Sheets CSV
 */
async function loadGuestlist() {
  try {
    loadingIndicator.style.display = "block";
    const res = await fetch(GUESTLIST_CSV_URL);
    const text = await res.text();
    const rows = csvToRows(text);

    if (!rows.length) {
      console.warn("Guest list is empty");
      return;
    }

    const header = rows.shift();
    
      // Use columns B, C and D (indices 1, 2 and 3) for guest names
      const guestColIdxs = [1, 2, 3];
    guestIndex = new Map();

    // Build guest list and index
    rows.forEach(r => {
      const names = guestColIdxs
        .map(i => (r[i] || "").trim())
        .filter(v => v.length > 0);

      if (!names.length) return;

      guestRows.push(names);
      
      // Index all names for fast lookup
      names.forEach(n => {
        const key = normalizeName(n);
        if (!guestIndex.has(key)) {
          guestIndex.set(key, names);
        }
      });
    });

    console.log(`Loaded ${guestRows.length} guest entries`);
  } catch (err) {
    console.error("Failed to load guest list:", err);
    showError(t("error_loading"));
  } finally {
    loadingIndicator.style.display = "none";
  }
}

/**
 * Search for guest by name (exact or fuzzy match)
 * Supports: first name only, last name only, or first name + last name
 */
function findGuestByName(input) {
  const key = normalizeName(input);
  const inputParts = key.split(/\s+/).filter(p => p.length > 0);

  // Exact match first
  if (guestIndex.has(key)) {
    return { match: guestIndex.get(key), confidence: "exact" };
  }

  // Enhanced fuzzy matching - match by individual name parts
  const matches = [];
  guestRows.forEach(row => {
    // Check each cell in the row (Guest 1, Guest 2, etc.)
    for (const cellValue of row) {
      const normalized = normalizeName(cellValue);
      const nameParts = normalized.split(/\s+/).filter(p => p.length > 0);
      
      // Check if all input parts match any name parts (order-independent)
      const allPartsMatch = inputParts.every(inputPart =>
        nameParts.some(namePart => 
          namePart === inputPart || namePart.indexOf(inputPart) === 0
        )
      );
      
      if (allPartsMatch && inputParts.length > 0) {
        matches.push(row);
        return; // Move to next row
      }
    }
    
    // Fallback: substring match in the normalized cell values
    for (const n of row) {
      if (normalizeName(n).indexOf(key) !== -1) {
        matches.push(row);
        return;
      }
    }
  });

  // Deduplicate matches
  const unique = [];
  matches.forEach(r => {
    if (!unique.some(u => u.join(",") === r.join(","))) {
      unique.push(r);
    }
  });

  if (unique.length === 1) {
    return { match: unique[0], confidence: "fuzzy" };
  }

  if (unique.length > 1) {
    return { ambiguous: true, candidates: unique };
  }

  return { notFound: true };
}

/**
 * Display error message
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
}

/**
 * Clear error message
 */
function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("show");
}

/**
 * Store verification in localStorage
 */
function storeGuestVerification(names) {
  const verified = {
    names: names,
    timestamp: Date.now()
  };
  localStorage.setItem("_wedding_guest", JSON.stringify(verified));
}

/**
 * Check if guest is verified
 */
function isGuestVerified() {
  const stored = localStorage.getItem("_wedding_guest");
  return stored ? JSON.parse(stored) : null;
}

/**
 * Handle verification
 */
async function handleVerificationClick() {
  clearError();
  const input = (guestNameInput.value || "").trim();

  if (!input) {
    showError(t("enter_your_name"));
    return;
  }

  loadingIndicator.style.display = "block";
  enterBtn.disabled = true;

  try {
    // Simulate slight delay to ensure CSV is loaded
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = findGuestByName(input);

    if (result.match) {
      // Guest found!
      storeGuestVerification(result.match);
      // Redirect to home page
      window.location.href = "index.html";
      return;
    }

    if (result.ambiguous) {
      showError("Multiple matches found. Please be more specific.");
      return;
    }

    // Guest not found
    showError(t("guest_not_found"));
  } catch (err) {
    console.error(err);
    showError(t("error_loading"));
  } finally {
    loadingIndicator.style.display = "none";
    enterBtn.disabled = false;
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
  // If there's a Netlify Identity token in the URL hash, let the widget handle it
  const hash = window.location.hash || "";
  if (hash.includes("invite_token") || hash.includes("confirmation_token") || hash.includes("recovery_token")) {
    return;
  }

  // Check if already verified
  if (isGuestVerified()) {
    window.location.href = "index.html";
    return;
  }

  // Load guest list
  loadGuestlist();

  // Event listeners
  enterBtn.addEventListener("click", handleVerificationClick);
  guestNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleVerificationClick();
    }
  });
});

/**
 * Export for use in other pages
 */
window.Wedding = {
  isGuestVerified: isGuestVerified,
  getVerifiedGuest: () => isGuestVerified()?.names || null,
  logout: () => {
    localStorage.removeItem("_wedding_guest");
    window.location.href = "gatekeeper.html";
  }
};
