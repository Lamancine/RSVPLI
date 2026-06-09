/**
 * Wedding RSVP Form with API Integration
 * Integrated with Apps Script backend via token authentication
 */

(function() {
  // ⚠️ CONFIGURE THESE:
  // Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlsM30cORGwtFht9vccDpKctuRFgHIGPTgMH6ts50MsETvcmCQalAJoQExhcj6yxkW/exec";
  
  // API Token (must match token in Apps Script)
  const API_TOKEN = "vf3a9c6d2b8e14f7a9c3d5e6f1a2b4c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4";
  
  // CSV URL of published Guest List (from Google Sheets - Guestlist tab)
  const GUESTLIST_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjPJpjVeFkcCbI5JdyQnn8P5EKpM_xugrpG7OOEmAhmewRw9qRkGlw_VwqltxBiXqQpjKpMNRmuB1s/pub?gid=1976428554&single=true&output=csv";

  // i18n translations
  const I18N = {
    en: {
      invited_title: "You're invited",
      enter_name_sub: "Enter your name",
      enter_btn: "Enter",
      name_not_found: "Name not found. Try your partner's name.",
      attend_label: "Will you attend?",
      yes: "Yes",
      no: "No",
      guest_n: idx => `Guest ${idx}`,
      languages_spoken: "Languages spoken",
      english: "English",
      french: "French",
      greek: "Greek",
      other_languages: "Other (separate with ;)",
      dietary_restrictions: "Dietary restrictions",
      none: "None",
      eggs: "Eggs",
      nuts: "Nuts",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      fish: "Fish",
      message_placeholder: "Message",
      review_rsvp: "Review & Send",
      thanks_title: "Thank you",
      thanks_text: "Your response has been received",
      validation_name_required: "Please enter a name.",
      review_title: "Review your RSVP",
      review_sub: "Please confirm your details before sending.",
      attendance_label: "Attendance",
      attending_yes: "Yes",
      attending_no: "No",
      guest_label: "Guest",
      languages_label: "Languages",
      diet_label: "Diet",
      message_label: "Message",
      brunch_label: "Will you join us for brunch the next day (Saturday, Sept. 5th) at Golden Star city resort in Peraia?",
      brunch_yes: "Yes, I'll be there!",
      brunch_no: "No, thank you",
      shuttle_label: "On the wedding day (Friday, Sept. 4th) Would you like to use a shuttle (back and forth) from Peraia - Golden Star City Resort to Ktima Xristidi?",
      shuttle_yes: "Yes",
      shuttle_no: "No",
      shuttle_email_label: "Please confirm or enter your email address",
      shuttle_email_placeholder: "Email address",
      validation_shuttle_email_required: "Please provide your email address if you want the shuttle.",
      validation_main_course_required: "Please select a main course for each guest.",
      main_course_label: "Main course preference",
      main_course_beef: "Beef",
      main_course_fish: "Fish",
      main_course_tick_label: "I would like a main course",
      main_course_note: "If you haven't checked a vegetarian/vegan box above, please note that there will be a meat course for everybody as starters",
      edit: "Edit",
      confirm_send: "Confirm & Send"
    },
    fr: {
      invited_title: "Vous êtes invité·e",
      enter_name_sub: "Entrez votre nom",
      enter_btn: "Entrer",
      name_not_found: "Nom introuvable. Essayez le nom de votre partenaire.",
      attend_label: "Serez-vous présent·e ?",
      yes: "Oui",
      no: "Non",
      guest_n: idx => `Invité ${idx}`,
      languages_spoken: "Langues parlées",
      english: "Anglais",
      french: "Français",
      greek: "Grec",
      other_languages: "Autre (séparer par ;)",
      dietary_restrictions: "Restrictions alimentaires",
      none: "Aucune",
      eggs: "Œufs",
      nuts: "Fruits à coque",
      vegetarian: "Végétarien",
      vegan: "Vegan",
      fish: "Poisson",
      message_placeholder: "Message",
      review_rsvp: "Vérifier & Envoyer",
      thanks_title: "Merci",
      thanks_text: "Votre réponse a bien été enregistrée",
      validation_name_required: "Veuillez saisir un nom.",
      review_title: "Vérification de votre RSVP",
      review_sub: "Merci de confirmer vos informations avant l'envoi.",
      attendance_label: "Présence",
      attending_yes: "Oui",
      attending_no: "Non",
      guest_label: "Invité",
      languages_label: "Langues",
      diet_label: "Régime",
      message_label: "Message",
      brunch_label: "Serez-vous des nôtres pour le brunch le lendemain (samedi, 5 sept.) à Golden Star city resort à Peraia ?",
      brunch_yes: "Oui, je serai là !",
      brunch_no: "Non, merci",
      shuttle_label: "Le jour du mariage (vendredi, 4 sept.) Souhaitez-vous utiliser une navette (aller-retour) de Peraia - Golden Star City Resort à Ktima Xristidi ?",
      shuttle_yes: "Oui",
      shuttle_no: "Non",
      shuttle_email_label: "Veuillez confirmer ou saisir votre adresse e-mail",
      shuttle_email_placeholder: "Adresse e-mail",
      validation_shuttle_email_required: "Veuillez fournir votre adresse e-mail si vous souhaitez la navette.",
      validation_main_course_required: "Veuillez sélectionner un plat principal pour chaque invité.",
      main_course_label: "Préférence du plat principal",
      main_course_beef: "Boeuf",
      main_course_fish: "Poisson",
      main_course_tick_label: "Je souhaite un plat principal",
      main_course_note: "Si vous n'avez pas coché végétarien/végan ci-dessus, veuillez noter qu'il y aura un plat de viande pour tout le monde en entrée",
      edit: "Modifier",
      confirm_send: "Confirmer & envoyer"
    },
    gr: {
      invited_title: "Είστε καλεσμένοι",
      enter_name_sub: "Εισάγετε το όνομά σας",
      enter_btn: "Είσοδος",
      name_not_found: "Το όνομα δεν βρέθηκε. Δοκιμάστε το όνομα του/της συντρόφου.",
      attend_label: "Θα παρευρεθείτε;",
      yes: "Ναι",
      no: "Όχι",
      guest_n: idx => `Καλεσμένος ${idx}`,
      languages_spoken: "Γλώσσες",
      english: "Αγγλικά",
      french: "Γαλλικά",
      greek: "Ελληνικά",
      other_languages: "Άλλο (διαχωρίστε με ;)",
      dietary_restrictions: "Διατροφικοί περιορισμοί",
      none: "Καμία",
      eggs: "Αυγά",
      nuts: "Ξηροί καρποί",
      vegetarian: "Χορτοφαγικό",
      vegan: "Βίγκαν",
      fish: "Ψάρια",
      message_placeholder: "Μήνυμα",
      review_rsvp: "Έλεγχος & Αποστολή",
      thanks_title: "Ευχαριστούμε",
      thanks_text: "Λάβαμε την απάντησή σας",
      validation_name_required: "Παρακαλώ εισάγετε όνομα.",
      review_title: "Έλεγχος της απάντησής σας",
      review_sub: "Επιβεβαιώστε τα στοιχεία πριν την αποστολή.",
      attendance_label: "Παρουσία",
      attending_yes: "Ναι",
      attending_no: "Όχι",
      guest_label: "Καλεσμένος",
      languages_label: "Γλώσσες",
      diet_label: "Διατροφή",
      message_label: "Μήνυμα",
      brunch_label: "Θα μας συντροφεύατε για brunch (Σάββατο, 5 Σεπτ.) την επόμενη ημέρα στο Golden Star city resort στην Περαία;",
      brunch_yes: "Ναι, θα είμαι εκεί!",
      brunch_no: "Όχι, ευχαριστώ",
      shuttle_label: "Θα θέλατε να χρησιμοποιήσετε λεωφορείο από το Peraia - Golden Star City Resort προς το Ktima Xristidi;",
      shuttle_yes: "Ναι",
      shuttle_no: "Όχι",
      shuttle_email_label: "Επιβεβαιώστε ή εισαγάγετε τη διεύθυνση email σας",
      shuttle_email_placeholder: "Διεύθυνση email",
      validation_shuttle_email_required: "Παρακαλώ δώστε τη διεύθυνσή σας email εάν θέλετε το shuttle.",
      validation_main_course_required: "Παρακαλώ επιλέξτε κυρίως πιάτο για κάθε καλεσμένο.",
      main_course_label: "Επιλογή κυρίως πιάτου",
      main_course_beef: "Μοσχάρι",
      main_course_fish: "Ψάρι",
      main_course_tick_label: "Θέλω κυρίως πιάτο",
      main_course_note: "Αν δεν έχετε επιλέξει κουτί χορτοφαγικό/βίγκαν παραπάνω, παρακαλώ σημειώστε ότι θα υπάρχει πιάτο με κρέας για όλους ως ορεκτικό",
      edit: "Επεξεργασία",
      confirm_send: "Επιβεβαίωση & αποστολή"
    }
  };

  let currentLang = "en";
  let guestRows = [];
  let guestIndex = new Map();
  let currentGuests = []; // Store current guests for re-rendering on language change

  // DOM Elements
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const familyTitle = document.getElementById("familyTitle");
  const guestsContainer = document.getElementById("guestsContainer");
  const attending = document.getElementById("attending");
  const openReviewBtn = document.getElementById("openReviewBtn");
  const message = document.getElementById("message");
  const reviewModal = document.getElementById("reviewModal");
  const reviewContent = document.getElementById("reviewContent");
  const closeReviewBtn = document.getElementById("closeReviewBtn");
  const editBtn = document.getElementById("editBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const sendError = document.getElementById("sendError");

  // Utility Functions
  function goToStep(n) {
    [step2, step3].forEach(s => s.classList.remove("active"));
    document.getElementById("step" + n).classList.add("active");
  }

  function setLang(lang) {
    currentLang = lang;
    const dict = I18N[lang] || I18N.en;
    
    document.querySelectorAll("[data-i18n-key]").forEach(el => {
      const key = el.getAttribute("data-i18n-key");
      const val = dict[key];
      if (typeof val === "function") return;
      if (val) el.textContent = val;
    });

    if (message) message.placeholder = dict.message_placeholder;

    // Update language buttons
    document.querySelectorAll(".langBtn").forEach(b => b.classList.remove("active"));
    const activeBtn = document.querySelector(`.langBtn[data-lang="${currentLang}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    
    // Re-render guest form with new language
    if (currentGuests && currentGuests.length > 0) {
      renderGuests(currentGuests);
    }
  }

  function normalizeName(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function getGuestEmailByNames(names) {
    if (!names) return "";
    const inputNames = Array.isArray(names) ? names : [names];
    const normalizedInput = inputNames.map(normalizeName).filter(n => n.length > 0);

    // 1) try direct index lookup
    for (const n of normalizedInput) {
      const guest = guestIndex.get(n);
      if (guest && guest.email) return guest.email;
    }

    // 2) fallback: search guestRows for any overlapping normalized name
    for (const gd of guestRows) {
      if (!gd || !gd.names) continue;
      const normalizedRowNames = gd.names.map(normalizeName).filter(n => n.length > 0);
      const overlap = normalizedRowNames.some(rn => normalizedInput.includes(rn));
      if (overlap && gd.email) return gd.email;
    }

    return "";
  }

  function csvToRows(csvText) {
    return csvText
      .trim()
      .split(/\r?\n/)
      .map(line => {
        // Simple CSV parsing
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

  async function loadGuestlist() {
    try {
      const res = await fetch(GUESTLIST_CSV_URL);
      const text = await res.text();
      const rows = csvToRows(text);
      
      if (!rows.length) return;
      
      const header = rows.shift();
      const nameColumns = [1, 2];
      const emailIndex = header.findIndex(h => /email/i.test(h));

      guestRows = [];
      guestIndex = new Map();

      rows.forEach(r => {
        const names = nameColumns
          .map(i => (r[i] || "").trim())
          .filter(v => v.length > 0);
        
        if (!names.length) return;
        
        const email = emailIndex >= 0 ? (r[emailIndex] || "").trim() : "";
        const guestData = { names, email };

        guestRows.push(guestData);
        names.forEach(n => {
          const key = normalizeName(n);
          if (!guestIndex.has(key)) {
            guestIndex.set(key, guestData);
          }
        });
      });
    } catch (err) {
      console.warn("Failed to load guest list:", err);
    }
  }

  function renderGuests(names) {
    const dict = I18N[currentLang] || I18N.en;
    const lookupNames = (currentGuests && currentGuests.length) ? currentGuests : names;
    const familyEmail = getGuestEmailByNames(lookupNames);
    guestsContainer.innerHTML = "";
    
    names.forEach((fullName, idx) => {
      const i = idx + 1;
      const block = document.createElement("div");
      block.className = "guest";

      block.innerHTML = `
        <h4 class="guestTitle">${dict.guest_n ? dict.guest_n(i) : "Guest " + i}</h4>
        <input class="guestName" value="${fullName.replace(/"/g, "&quot;")}" placeholder="Full name">
        
        <div class="section"><label data-i18n-dyn="languages_spoken">${dict.languages_spoken}</label></div>
        <label class="check"><input type="checkbox" class="langCheck lang-${i}" value="English"><span data-i18n-dyn="english">${dict.english}</span></label>
        <label class="check"><input type="checkbox" class="langCheck lang-${i}" value="French"><span data-i18n-dyn="french">${dict.french}</span></label>
        <label class="check"><input type="checkbox" class="langCheck lang-${i}" value="Greek"><span data-i18n-dyn="greek">${dict.greek}</span></label>
        <label class="check"><input type="checkbox" class="langCheck lang-${i}" value="Other"><input type="text" class="langOther lang-${i}" placeholder="${dict.other_languages}"></label>
        
        <div class="section"><label data-i18n-dyn="dietary_restrictions">${dict.dietary_restrictions}</label></div>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-none" value="None"><span data-i18n-dyn="none">${dict.none}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Eggs"><span data-i18n-dyn="eggs">${dict.eggs}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Nuts"><span data-i18n-dyn="nuts">${dict.nuts}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Vegetarian"><span data-i18n-dyn="vegetarian">${dict.vegetarian}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Vegan"><span data-i18n-dyn="vegan">${dict.vegan}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Fish"><span data-i18n-dyn="fish">${dict.fish}</span></label>
        <label class="check"><input type="checkbox" class="dietCheck diet-${i} diet-regular" value="Other"><input type="text" class="otherInput diet-${i}" placeholder="${dict.other_languages}"></label>
        
        <div class="section"><label data-i18n-dyn="brunch_label">${dict.brunch_label}</label></div>
        <select class="brunchSelect brunch-${i}" aria-label="Brunch participation">
          <option value="Yes" data-i18n-dyn="brunch_yes">${dict.brunch_yes}</option>
          <option value="No" data-i18n-dyn="brunch_no">${dict.brunch_no}</option>
        </select>
        
        <div class="section"><label data-i18n-dyn="shuttle_label">${dict.shuttle_label}</label></div>
        <select class="shuttleSelect shuttle-${i}" aria-label="Shuttle service">
          <option value="No" data-i18n-dyn="shuttle_no">${dict.shuttle_no}</option>
          <option value="Yes" data-i18n-dyn="shuttle_yes">${dict.shuttle_yes}</option>
        </select>
        <div class="shuttle-email-wrapper shuttleEmailWrapper-${i}" style="display: none; margin-top: 14px;">
          <label data-i18n-dyn="shuttle_email_label">${dict.shuttle_email_label}</label>
          <input type="email" class="shuttleEmail shuttleEmail-${i}" placeholder="${dict.shuttle_email_placeholder}" value="${familyEmail.replace(/"/g, '&quot;')}">
        </div>

        <div class="section"><label data-i18n-dyn="main_course_label">${dict.main_course_label}</label></div>
        <select class="mainCourseSelect mainCourse-${i}" aria-label="Main course">
          <option value="">--</option>
          <option value="Beef" data-i18n-dyn="main_course_beef">${dict.main_course_beef}</option>
          <option value="Fish" data-i18n-dyn="main_course_fish">${dict.main_course_fish}</option>
        </select>
        <div class="main-course-note" style="font-size:0.9em; color:#666; margin-top:8px;">${dict.main_course_note}</div>
      `;

      guestsContainer.appendChild(block);

      const shuttleSelect = block.querySelector(`.shuttle-${i}`);
      const emailWrapper = block.querySelector(`.shuttleEmailWrapper-${i}`);
      const emailInput = block.querySelector(`.shuttleEmail-${i}`);

      shuttleSelect.addEventListener("change", () => {
        const showEmail = shuttleSelect.value === "Yes";
        if (emailWrapper) {
          emailWrapper.style.display = showEmail ? "block" : "none";
        }
        if (showEmail && emailInput && !emailInput.value.trim()) {
          emailInput.value = familyEmail || "";
        }
      });
    });

    // Dietary restriction exclusivity - None checkbox
    const noneCheckboxes = guestsContainer.querySelectorAll(".diet-none");
    const regularCheckboxes = guestsContainer.querySelectorAll(".diet-regular");

    // When "None" is checked, uncheck all other dietary options
    noneCheckboxes.forEach(none => {
      none.addEventListener("change", e => {
        if (e.target.checked) {
          const i = e.target.className.match(/diet-(\d+)/)[1];
          guestsContainer.querySelectorAll(`.diet-${i}.diet-regular`).forEach(el => {
            el.checked = false;
          });
        }
      });
    });

    // When any other dietary option is checked, uncheck "None"
    regularCheckboxes.forEach(el => {
      el.addEventListener("change", e => {
        if (e.target.checked) {
          const i = e.target.className.match(/diet-(\d+)/)[1];
          const none = guestsContainer.querySelector(`.diet-${i}.diet-none`);
          if (none) none.checked = false;
        }
      });
    });
  }

  function collectGroup(prefix, i) {
    // Collect all checked checkboxes EXCEPT "Other"
    const checks = [...document.querySelectorAll(`.${prefix}-${i}`)]
      .filter(el => el.type === "checkbox" && el.checked && el.value !== "Other")
      .map(el => el.value);
    
    // Collect text input values (from the "Other" text field)
    const textInput = [...document.querySelectorAll(`.${prefix}-${i}`)]
      .find(el => el.type === "text");
    
    if (textInput && textInput.value.trim()) {
      const otherValues = textInput.value.trim().split(';').map(v => v.trim()).filter(v => v);
      checks.push(...otherValues);
    }
    return checks.join(", ");
  }

  function updateFormVisibility() {
    const isNo = attending && attending.value === "No";
    if (step2) step2.classList.toggle("rsvp-no", isNo);
  }

  function getAuthenticatedGuestCode() {
    const verified = localStorage.getItem("_wedding_guest");
    if (!verified) return "";
    const guestData = JSON.parse(verified);
    return guestData.names.join("-");
  }

  function collectFormDataForReview() {
    const dict = I18N[currentLang] || I18N.en;
    const attendingVal = attending.value;
    const messageVal = message.value || "";

    let guests = [];
    const code = getAuthenticatedGuestCode();

    if (attendingVal !== "No") {
      const guestBlocks = [...document.querySelectorAll("#guestsContainer .guest")];
      const firstName = guestBlocks[0]?.querySelector(".guestName")?.value.trim();
      
      if (!firstName) {
        return { error: dict.validation_name_required };
      }

      for (let idx = 0; idx < guestBlocks.length; idx++) {
        const block = guestBlocks[idx];
        const idx1 = idx + 1;
        const name = block.querySelector(".guestName").value.trim();
        const langs = collectGroup("lang", idx1);
        const diet = collectGroup("diet", idx1);
        const brunchGuest = block.querySelector(`.brunch-${idx1}`)?.value || "No";
        const shuttleGuest = block.querySelector(`.shuttle-${idx1}`)?.value || "No";
        const guestEmail = block.querySelector(`.shuttleEmail-${idx1}`)?.value.trim() || "";

        const mainCourse = block.querySelector(`.mainCourse-${idx1}`)?.value || "";

        if (!mainCourse) {
          return { error: dict.validation_main_course_required || "Please select a main course." };
        }
        if (shuttleGuest === "Yes" && !guestEmail) {
          return { error: dict.validation_shuttle_email_required };
        }

        guests.push({
          name,
          langs,
          diet,
          brunch: brunchGuest,
          shuttle: shuttleGuest,
          email: guestEmail,
          mainCourseTick: mainCourse ? "Yes" : "No",
          mainCourse: mainCourse
        });
      }
    }

    return {
      payload: {
        code,
        attending: attendingVal,
        message: messageVal,
        languageUI: currentLang,
        guests,
        token: API_TOKEN
      }
    };
  }

  function renderReview(payload) {
    const dict = I18N[currentLang] || I18N.en;
    const rows = [];

    rows.push(`
      <div class="review-row">
        <div class="review-label">${dict.attendance_label}:</div>
        <div class="review-value">${payload.attending === "Yes" ? dict.attending_yes : dict.attending_no}</div>
      </div>
    `);

    if (payload.attending !== "No") {
      payload.guests.forEach((g, idx) => {
        rows.push(`
          <div class="review-guest">
            <div class="review-row">
              <div class="review-label">${dict.guest_label} ${idx + 1}:</div>
              <div class="review-value">${g.name}</div>
            </div>
            ${g.langs ? `<div class="review-row"><div class="review-label">${dict.languages_label}:</div><div class="review-value">${g.langs}</div></div>` : ""}
            ${g.diet ? `<div class="review-row"><div class="review-label">${dict.diet_label}:</div><div class="review-value">${g.diet}</div></div>` : ""}
            <div class="review-row"><div class="review-label">${dict.brunch_label}:</div><div class="review-value">${g.brunch === "Yes" ? dict.brunch_yes : dict.brunch_no}</div></div>
            <div class="review-row"><div class="review-label">${dict.shuttle_label}:</div><div class="review-value">${g.shuttle === "Yes" ? dict.shuttle_yes : dict.shuttle_no}</div></div>
            ${g.email ? `<div class="review-row"><div class="review-label">${dict.shuttle_email_label}:</div><div class="review-value">${g.email}</div></div>` : ""}
            <div class="review-row"><div class="review-label">${dict.main_course_label}:</div><div class="review-value">${g.mainCourse || ""}</div></div>
          </div>
        `);
      });
    }

    if (payload.message) {
      rows.push(`
        <div class="review-row" style="margin-top: 10px; border-top: 1px dashed rgba(201,162,39,0.35); padding-top: 10px;">
          <div class="review-label">${dict.message_label}:</div>
          <div class="review-value">${payload.message}</div>
        </div>
      `);
    }

    reviewContent.innerHTML = rows.join("");
  }

  function openReview() {
    sendError.style.display = "none";
    sendError.textContent = "";

    const result = collectFormDataForReview();
    if (result.error) {
      sendError.textContent = result.error;
      sendError.style.display = "block";
      return;
    }

    renderReview(result.payload);
    reviewModal.classList.remove("hidden");
    reviewModal.setAttribute("aria-hidden", "false");
    reviewModal._payload = result.payload;
  }

  function closeReview() {
    reviewModal.classList.add("hidden");
    reviewModal.setAttribute("aria-hidden", "true");
    reviewModal._payload = null;
  }

  async function sendFinalRSVP() {
    const dict = I18N[currentLang] || I18N.en;
    const payload = reviewModal._payload;

    if (!payload) return;

    confirmBtn.disabled = true;

    try {
      console.log("RSVP payload:", payload);
      console.log("Sending RSVP to:", SCRIPT_URL);

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Server responded " + res.status);

      let data = {};
      try {
        data = await res.json();
      } catch (_) {
        data = { status: "success" };
      }

      if (data.status === "success" || data.status === "ok") {
        closeReview();
        goToStep(3);
      } else {
        sendError.textContent = data.message || "Error sending RSVP";
        sendError.style.display = "block";
        closeReview();
      }
    } catch (err) {
      console.error(err);
      sendError.textContent = "Error sending: " + (err.message || err);
      sendError.style.display = "block";
      closeReview();
    } finally {
      confirmBtn.disabled = false;
    }
  }

  // Initialization
  function init() {
    (async () => {
      try {
        await loadGuestlist();
      } catch (e) {
        console.warn("Guest list load failed", e);
      }

      setLang(currentLang);

      // Get authenticated guest from localStorage
      const verified = localStorage.getItem("_wedding_guest");
      if (verified) {
        const guestData = JSON.parse(verified);
        const names = guestData.names;
        
        // Display guest info and show RSVP form directly
        familyTitle.textContent = names.join(" • ");
        currentGuests = names; // Store guests for re-rendering on language change
        renderGuests(names);
        updateFormVisibility();
      }

      document.querySelectorAll(".langBtn").forEach(btn => {
        btn.addEventListener("click", () => setLang(btn.dataset.lang));
      });

      if (attending) {
        attending.addEventListener("change", updateFormVisibility);
      }

      openReviewBtn.addEventListener("click", openReview);
      closeReviewBtn.addEventListener("click", closeReview);
      editBtn.addEventListener("click", closeReview);
      confirmBtn.addEventListener("click", sendFinalRSVP);
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
