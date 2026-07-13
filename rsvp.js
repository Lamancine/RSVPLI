/**
 * Wedding RSVP Form — dynamic, CMS-driven
 */
(function () {
  'use strict';

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8SDSLYRjaoPYKOFAgppsOn7TDdnf-L0kih9F2R008xCKdNUmQ7VhY2b0zN-t0SqRR/exec";
  const API_TOKEN  = "vf3a9c6d2b8e14f7a9c3d5e6f1a2b4c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4";
  const GUESTLIST_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjPJpjVeFkcCbI5JdyQnn8P5EKpM_xugrpG7OOEmAhmewRw9qRkGlw_VwqltxBiXqQpjKpMNRmuB1s/pub?gid=1976428554&single=true&output=csv";
  const CONFIG_URL = "/_data/rsvp_config.json";

  // ── Translations (framework strings only – question labels come from rsvp_config.json) ──
  const I18N = {
    en: {
      attend_label: "Will you attend?",
      yes: "Yes",
      no: "No",
      guest_n: i => `Guest ${i}`,
      message_placeholder: "Message (optional)",
      review_rsvp: "Review & Send",
      thanks_title: "Thank you",
      thanks_text: "Your response has been received",
      validation_name_required: "Please enter a name.",
      validation_required: f => `Please answer: ${f}`,
      validation_shuttle_email_required: "Please provide your email address for the shuttle.",
      validation_shuttle_direction_required: "Please select a shuttle trip direction.",
      validation_shuttle_skg_phone_required: "Please provide your phone number for the SKG shuttle.",
      shuttle_skg_phone_label: "Your phone number (for the SKG shuttle)",
      shuttle_skg_phone_placeholder: "Phone number",
      review_title: "Review your RSVP",
      review_sub: "Please confirm your details before sending.",
      attendance_label: "Attendance",
      attending_yes: "Yes",
      attending_no: "No",
      guest_label: "Guest",
      message_label: "Message",
      edit: "Edit",
      confirm_send: "Confirm & Send",
      shuttle_email_label: "Please confirm or enter your email address",
      shuttle_email_placeholder: "Email address",
      guest2_question: "Are you bringing a +1?",
      guest2_yes: "Yes, add a guest",
      guest2_no: "No, just me",
      guest2_default_name: "Guest 2"
    },
    fr: {
      attend_label: "Serez-vous présent·e ?",
      yes: "Oui",
      no: "Non",
      guest_n: i => `Invité·e ${i}`,
      message_placeholder: "Message (facultatif)",
      review_rsvp: "Vérifier & Envoyer",
      thanks_title: "Merci",
      thanks_text: "Votre réponse a bien été enregistrée",
      validation_name_required: "Veuillez saisir un nom.",
      validation_required: f => `Veuillez répondre à : ${f}`,
      validation_shuttle_email_required: "Veuillez fournir votre e-mail pour la navette.",
      validation_shuttle_direction_required: "Veuillez choisir un trajet pour la navette.",
      validation_shuttle_skg_phone_required: "Veuillez fournir votre numéro de téléphone pour la navette SKG.",
      shuttle_skg_phone_label: "Votre numéro de téléphone (navette SKG)",
      shuttle_skg_phone_placeholder: "Numéro de téléphone",
      review_title: "Vérification de votre RSVP",
      review_sub: "Merci de confirmer vos informations avant l'envoi.",
      attendance_label: "Présence",
      attending_yes: "Oui",
      attending_no: "Non",
      guest_label: "Invité·e",
      message_label: "Message",
      edit: "Modifier",
      confirm_send: "Confirmer & Envoyer",
      shuttle_email_label: "Veuillez confirmer ou saisir votre adresse e-mail",
      shuttle_email_placeholder: "Adresse e-mail",
      guest2_question: "Venez-vous avec un·e accompagnant·e ?",
      guest2_yes: "Oui, ajouter",
      guest2_no: "Non, juste moi",
      guest2_default_name: "Invité·e 2"
    },
    el: {
      attend_label: "Θα παρευρεθείτε;",
      yes: "Ναι",
      no: "Όχι",
      guest_n: i => `Καλεσμένος/η ${i}`,
      message_placeholder: "Μήνυμα (προαιρετικό)",
      review_rsvp: "Έλεγχος & Αποστολή",
      thanks_title: "Ευχαριστούμε",
      thanks_text: "Λάβαμε την απάντησή σας",
      validation_name_required: "Παρακαλώ εισάγετε όνομα.",
      validation_required: f => `Παρακαλώ απαντήστε: ${f}`,
      validation_shuttle_email_required: "Παρακαλώ δώστε το email σας για το shuttle.",
      validation_shuttle_direction_required: "Παρακαλώ επιλέξτε διαδρομή για το shuttle.",
      validation_shuttle_skg_phone_required: "Παρακαλώ δώστε τον αριθμό τηλεφώνου σας για το shuttle SKG.",
      shuttle_skg_phone_label: "Αριθμός τηλεφώνου (shuttle SKG)",
      shuttle_skg_phone_placeholder: "Αριθμός τηλεφώνου",
      review_title: "Έλεγχος της απάντησής σας",
      review_sub: "Επιβεβαιώστε τα στοιχεία πριν την αποστολή.",
      attendance_label: "Παρουσία",
      attending_yes: "Ναι",
      attending_no: "Όχι",
      guest_label: "Καλεσμένος/η",
      message_label: "Μήνυμα",
      edit: "Επεξεργασία",
      confirm_send: "Επιβεβαίωση & Αποστολή",
      shuttle_email_label: "Επιβεβαιώστε ή εισαγάγετε τη διεύθυνση email σας",
      shuttle_email_placeholder: "Διεύθυνση email",
      guest2_question: "Έρχεστε με ακόμα ένα άτομο;",
      guest2_yes: "Ναι, προσθήκη",
      guest2_no: "Όχι, μόνος/η μου",
      guest2_default_name: "Καλεσμένος/η 2"
    }
  };
  I18N.gr = I18N.el; // backward compat

  // ── State ──
  let currentLang  = "fr";
  let rsvpConfig   = null;
  let guestRows    = [];
  let guestIndex   = new Map();
  let currentGuests = [];
  let isSoloGuest  = false;
  let guest2Active = false;

  // ── DOM ──
  const step2         = document.getElementById("step2");
  const step3         = document.getElementById("step3");
  const familyTitle   = document.getElementById("familyTitle");
  const guestsContainer = document.getElementById("guestsContainer");
  const attending     = document.getElementById("attending");
  const openReviewBtn = document.getElementById("openReviewBtn");
  const message       = document.getElementById("message");
  const reviewModal   = document.getElementById("reviewModal");
  const reviewContent = document.getElementById("reviewContent");
  const closeReviewBtn = document.getElementById("closeReviewBtn");
  const editBtn       = document.getElementById("editBtn");
  const confirmBtn    = document.getElementById("confirmBtn");
  const sendError     = document.getElementById("sendError");
  const guest2Section = document.getElementById("guest2Section");

  // ── Helpers ──
  function goToStep(n) {
    [step2, step3].forEach(s => s.classList.remove("active"));
    document.getElementById("step" + n).classList.add("active");
  }

  function d() { return I18N[currentLang] || I18N.en; }

  function lc() { return (currentLang === 'gr') ? 'el' : currentLang; }

  function esc(str) {
    return String(str || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function normalizeName(s) {
    return (s || "").toString().normalize("NFD")
      .replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/\s+/g, " ").trim();
  }

  function getGuestEmail(names) {
    if (!names) return "";
    const inp = Array.isArray(names) ? names : [names];
    const norm = inp.map(normalizeName).filter(Boolean);
    for (const n of norm) { const g = guestIndex.get(n); if (g && g.email) return g.email; }
    for (const gd of guestRows) {
      if (!gd || !gd.names) continue;
      if (gd.names.map(normalizeName).some(rn => norm.includes(rn)) && gd.email) return gd.email;
    }
    return "";
  }

  function csvToRows(text) {
    return text.trim().split(/\r?\n/).map(line => {
      const cells = []; let cur = "", inQ = false;
      for (const ch of line) {
        if (ch === '"') inQ = !inQ;
        else if (ch === ',' && !inQ) { cells.push(cur.trim()); cur = ""; }
        else cur += ch;
      }
      cells.push(cur.trim());
      return cells;
    });
  }

  // ── Data loading ──
  async function loadGuestlist() {
    try {
      const res  = await fetch(GUESTLIST_CSV_URL);
      const text = await res.text();
      const rows = csvToRows(text);
      if (!rows.length) return;
      const header = rows.shift();
      const emailIdx = header.findIndex(h => /email/i.test(h));
      guestRows = []; guestIndex = new Map();
      rows.forEach(r => {
        const names = [1, 2, 3].map(i => (r[i] || "").trim()).filter(Boolean);
        if (!names.length) return;
        const email = emailIdx >= 0 ? (r[emailIdx] || "").trim() : "";
        const gd = { names, email };
        guestRows.push(gd);
        names.forEach(n => { const k = normalizeName(n); if (!guestIndex.has(k)) guestIndex.set(k, gd); });
      });
    } catch (e) { console.warn("Guest list load failed", e); }
  }

  async function loadRsvpConfig() {
    try {
      const r = await fetch(CONFIG_URL + "?_=" + Date.now());  // bypass browser cache
      rsvpConfig = await r.json();
    } catch (e) { rsvpConfig = null; }
  }

  // ── Section rendering ──
  function renderSectionHTML(section, guestIdx, familyEmail) {
    const lang  = lc();
    const label = section["label_" + lang] || section.label_en || "";
    const sid   = section.id;

    let html = `<div class="form-section" data-sid="${esc(sid)}" data-gid="${guestIdx}">`;
    html += `<div class="section-label">${esc(label)}</div>`;

    if (section.type === "multi") {
      (section.options || []).forEach(opt => {
        const ol = opt["label_" + lang] || opt.label_en || "";
        if (opt.has_text_input) {
          html += `<label class="check">
            <input type="checkbox" class="opt-check sect-${esc(sid)} opt-${esc(sid)}-${guestIdx}" value="${esc(opt.value)}"${opt.exclusive ? ' data-exclusive' : ''}>
            <input type="text" class="opt-text opt-text-${esc(sid)}-${guestIdx}" placeholder="${esc(ol)}">
          </label>`;
        } else {
          html += `<label class="check">
            <input type="checkbox" class="opt-check sect-${esc(sid)} opt-${esc(sid)}-${guestIdx}" value="${esc(opt.value)}"${opt.exclusive ? ' data-exclusive' : ''}>
            <span>${esc(ol)}</span>
          </label>`;
        }
      });

    } else if (section.type === "single") {
      (section.options || []).forEach(opt => {
        const ol = opt["label_" + lang] || opt.label_en || "";
        html += `<label class="radio-option">
          <input type="radio" name="opt-radio-${esc(sid)}-${guestIdx}" class="opt-radio opt-radio-${esc(sid)}-${guestIdx}" value="${esc(opt.value)}">
          <span>${esc(ol)}</span>
        </label>`;
      });

      // Follow-up sub-question (e.g. shuttle direction)
      if (section.followup_trigger && (section.followup_options || []).length) {
        const fl = section["followup_label_" + lang] || section.followup_label_en || "";
        html += `<div class="followup-section" id="followup-${esc(sid)}-${guestIdx}" style="display:none">`;
        html += `<div class="section-sub-label">${esc(fl)}</div>`;
        (section.followup_options || []).forEach(opt => {
          const ol = opt["label_" + lang] || opt.label_en || "";
          html += `<label class="radio-option">
            <input type="radio" name="followup-radio-${esc(sid)}-${guestIdx}" class="followup-radio followup-radio-${esc(sid)}-${guestIdx}" value="${esc(opt.value)}">
            <span>${esc(ol)}</span>
          </label>`;
        });
        html += `</div>`;
      }

      // Shuttle email (special)
      if (sid === "shuttle") {
        const dict = d();
        html += `<div class="shuttle-email-wrapper" id="shuttle-email-${guestIdx}" style="display:none">`;
        html += `<div class="section-sub-label">${esc(dict.shuttle_email_label)}</div>`;
        html += `<input type="email" class="shuttleEmail shuttleEmail-${guestIdx}" placeholder="${esc(dict.shuttle_email_placeholder)}" value="${esc(familyEmail)}">`;
        html += `</div>`;
      }

      // Shuttle SKG phone (special)
      if (sid === "Shuttle_SKG") {
        const dict = d();
        html += `<div class="shuttle-skg-phone-wrapper" id="shuttle-skg-phone-${guestIdx}" style="display:none">`;
        html += `<div class="section-sub-label">${esc(dict.shuttle_skg_phone_label)}</div>`;
        html += `<input type="tel" class="shuttleSKGPhone shuttleSKGPhone-${guestIdx}" placeholder="${esc(dict.shuttle_skg_phone_placeholder)}">`;
        html += `</div>`;
      }
    }

    const note = section["note_" + lang] || section.note_en || "";
    if (note) html += `<div class="section-note">${esc(note)}</div>`;

    html += `</div>`;
    return html;
  }

  function renderGuestBlockHTML(fullName, guestIdx, familyEmail) {
    const dict  = d();
    const title = typeof dict.guest_n === "function" ? dict.guest_n(guestIdx) : `Guest ${guestIdx}`;
    let html = `<div class="guest" data-guest-idx="${guestIdx}">`;
    html += `<h4 class="guestTitle">${esc(title)}</h4>`;
    html += `<input class="guestName" value="${esc(fullName)}" placeholder="Full name">`;
    if (rsvpConfig && rsvpConfig.sections) {
      rsvpConfig.sections.forEach(s => {
        if (s.enabled !== false) html += renderSectionHTML(s, guestIdx, familyEmail);
      });
    }
    html += `</div>`;
    return html;
  }

  function attachSectionEvents(guestIdx) {
    if (!rsvpConfig || !rsvpConfig.sections) return;
    rsvpConfig.sections.forEach(section => {
      if (section.enabled === false) return;
      const sid = section.id;

      if (section.type === "multi") {
        document.querySelectorAll(`.opt-${sid}-${guestIdx}[data-exclusive]`).forEach(el => {
          el.addEventListener("change", e => {
            if (e.target.checked) {
              document.querySelectorAll(`.opt-${sid}-${guestIdx}:not([data-exclusive])`).forEach(o => o.checked = false);
            }
          });
        });
        document.querySelectorAll(`.opt-${sid}-${guestIdx}:not([data-exclusive])`).forEach(el => {
          el.addEventListener("change", e => {
            if (e.target.checked) {
              document.querySelectorAll(`.opt-${sid}-${guestIdx}[data-exclusive]`).forEach(o => o.checked = false);
            }
          });
        });

      } else if (section.type === "single" && section.followup_trigger) {
        const followupEl    = document.getElementById(`followup-${sid}-${guestIdx}`);
        const emailWrapper  = sid === "shuttle" ? document.getElementById(`shuttle-email-${guestIdx}`) : null;
        const phoneWrapper  = sid === "Shuttle_SKG" ? document.getElementById(`shuttle-skg-phone-${guestIdx}`) : null;
        document.querySelectorAll(`.opt-radio-${sid}-${guestIdx}`).forEach(radio => {
          radio.addEventListener("change", () => {
            const show = radio.value === section.followup_trigger && radio.checked;
            if (followupEl) followupEl.style.display = show ? "block" : "none";
            if (emailWrapper) {
              emailWrapper.style.display = show ? "block" : "none";
              if (show) {
                const emailInput = emailWrapper.querySelector(".shuttleEmail");
                if (emailInput && !emailInput.value.trim()) emailInput.value = getGuestEmail(currentGuests);
              }
            }
            if (phoneWrapper) phoneWrapper.style.display = show ? "block" : "none";
          });
        });
      }
    });
  }

  // ── Form state save/restore (for language switches) ──
  function saveFormState() {
    const state = {};
    document.querySelectorAll(".guest").forEach(block => {
      const gid = block.dataset.guestIdx;
      state[gid] = {
        name: block.querySelector(".guestName")?.value || "",
        checks: {}, radios: {}, followupRadios: {}, texts: {}, email: "", phone: ""
      };
      block.querySelectorAll(".opt-check:checked").forEach(el => {
        const m = el.className.match(/opt-(\S+?)-(\d+)/);
        if (m) { const sid = m[1]; if (!state[gid].checks[sid]) state[gid].checks[sid] = []; state[gid].checks[sid].push(el.value); }
      });
      block.querySelectorAll(".opt-radio:checked").forEach(el => {
        const m = el.className.match(/opt-radio-(\S+?)-(\d+)/);
        if (m) state[gid].radios[m[1]] = el.value;
      });
      block.querySelectorAll(".followup-radio:checked").forEach(el => {
        const m = el.className.match(/followup-radio-(\S+?)-(\d+)/);
        if (m) state[gid].followupRadios[m[1]] = el.value;
      });
      block.querySelectorAll(".opt-text").forEach(el => {
        const m = el.className.match(/opt-text-(\S+?)-(\d+)/);
        if (m) state[gid].texts[m[1]] = el.value;
      });
      const emailEl = block.querySelector(".shuttleEmail");
      if (emailEl) state[gid].email = emailEl.value;
      const phoneEl = block.querySelector(".shuttleSKGPhone");
      if (phoneEl) state[gid].phone = phoneEl.value;
    });
    return state;
  }

  function restoreFormState(state) {
    Object.entries(state).forEach(([gid, s]) => {
      const block = document.querySelector(`.guest[data-guest-idx="${gid}"]`);
      if (!block) return;
      const nameEl = block.querySelector(".guestName");
      if (nameEl && s.name) nameEl.value = s.name;
      Object.entries(s.checks).forEach(([sid, vals]) => {
        vals.forEach(val => {
          const el = block.querySelector(`.opt-${sid}-${gid}[value="${val}"]`);
          if (el) el.checked = true;
        });
      });
      Object.entries(s.radios).forEach(([sid, val]) => {
        const el = block.querySelector(`.opt-radio-${sid}-${gid}[value="${val}"]`);
        if (el) { el.checked = true; el.dispatchEvent(new Event("change")); }
      });
      Object.entries(s.followupRadios).forEach(([sid, val]) => {
        const el = block.querySelector(`.followup-radio-${sid}-${gid}[value="${val}"]`);
        if (el) el.checked = true;
      });
      Object.entries(s.texts).forEach(([sid, val]) => {
        const el = block.querySelector(`.opt-text-${sid}-${gid}`);
        if (el) el.value = val;
      });
      const emailEl = block.querySelector(".shuttleEmail");
      if (emailEl && s.email) emailEl.value = s.email;
      const phoneEl = block.querySelector(".shuttleSKGPhone");
      if (phoneEl && s.phone) phoneEl.value = s.phone;
    });
  }

  // ── Render guests ──
  function renderGuests(names) {
    const familyEmail = getGuestEmail(names);
    guestsContainer.innerHTML = "";
    names.forEach((fullName, idx) => {
      guestsContainer.innerHTML += renderGuestBlockHTML(fullName, idx + 1, familyEmail);
    });
    names.forEach((_, idx) => attachSectionEvents(idx + 1));
    updateGuest2Visibility();
  }

  // ── Guest 2 section ──
  function initGuest2Section() {
    if (!guest2Section) return;
    const dict = d();
    guest2Section.innerHTML = `
      <div class="guest2-inner">
        <div class="guest2-question">${esc(dict.guest2_question)}</div>
        <div class="guest2-choices">
          <button type="button" class="guest2-btn guest2-btn-yes">${esc(dict.guest2_yes)}</button>
          <button type="button" class="guest2-btn guest2-btn-no">${esc(dict.guest2_no)}</button>
        </div>
        <div class="guest2-form"></div>
      </div>
    `;
    guest2Section.querySelector(".guest2-btn-yes").addEventListener("click", () => setGuest2Active(true));
    guest2Section.querySelector(".guest2-btn-no").addEventListener("click", () => setGuest2Active(false));
  }

  function setGuest2Active(active) {
    guest2Active = active;
    const dict  = d();
    const btnYes = guest2Section?.querySelector(".guest2-btn-yes");
    const btnNo  = guest2Section?.querySelector(".guest2-btn-no");
    const form   = guest2Section?.querySelector(".guest2-form");
    if (btnYes) btnYes.classList.toggle("selected", active);
    if (btnNo)  btnNo.classList.toggle("selected", !active);
    if (!form) return;
    if (active) {
      const familyEmail = getGuestEmail(currentGuests);
      const savedName   = form.querySelector(".guestName")?.value || dict.guest2_default_name;
      form.innerHTML    = renderGuestBlockHTML(savedName, 2, familyEmail);
      attachSectionEvents(2);
      form.style.display = "block";
    } else {
      form.innerHTML     = "";
      form.style.display = "none";
    }
  }

  function updateGuest2Visibility() {
    if (!guest2Section) return;
    const show = isSoloGuest && attending && attending.value !== "No";
    guest2Section.style.display = show ? "block" : "none";
    if (!show) guest2Active = false;
  }

  function refreshGuest2Labels() {
    if (!guest2Section || !isSoloGuest) return;
    const dict = d();
    const q    = guest2Section.querySelector(".guest2-question");
    const bY   = guest2Section.querySelector(".guest2-btn-yes");
    const bN   = guest2Section.querySelector(".guest2-btn-no");
    if (q)  q.textContent  = dict.guest2_question;
    if (bY) bY.textContent = dict.guest2_yes;
    if (bN) bN.textContent = dict.guest2_no;
  }

  // ── Language ──
  function setLang(lang) {
    currentLang = lang;
    const dict = d();

    document.querySelectorAll("[data-i18n-key]").forEach(el => {
      const key = el.getAttribute("data-i18n-key");
      const val = dict[key];
      if (typeof val !== "function" && val) el.textContent = val;
    });
    if (message) message.placeholder = dict.message_placeholder;

    if (currentGuests && currentGuests.length > 0) {
      const savedState = saveFormState();
      const wasActive  = guest2Active;
      renderGuests(currentGuests);
      restoreFormState(savedState);
      if (wasActive) setGuest2Active(true);
    }

    refreshGuest2Labels();
    updateGuest2Visibility();
  }

  function updateFormVisibility() {
    const isNo = attending && attending.value === "No";
    if (step2) step2.classList.toggle("rsvp-no", isNo);
    updateGuest2Visibility();
  }

  // ── Data collection ──
  function getAuthCode() {
    const v = localStorage.getItem("_wedding_guest");
    if (!v) return "";
    return JSON.parse(v).names.join("-");
  }

  function collectGuestData(guestIdx) {
    const block = document.querySelector(`.guest[data-guest-idx="${guestIdx}"]`);
    if (!block) return null;
    const result = { name: block.querySelector(".guestName")?.value.trim() || "" };

    (rsvpConfig?.sections || []).forEach(section => {
      if (section.enabled === false) return;
      const sid = section.id;

      if (section.type === "multi") {
        const checks = [...block.querySelectorAll(`.opt-${sid}-${guestIdx}:checked`)]
          .filter(el => el.value !== "Other").map(el => el.value);
        const textEl = block.querySelector(`.opt-text-${sid}-${guestIdx}`);
        if (textEl && textEl.value.trim()) {
          checks.push(...textEl.value.trim().split(";").map(v => v.trim()).filter(Boolean));
        }
        result[sid] = checks.join(", ");

      } else if (section.type === "single") {
        const radio = block.querySelector(`.opt-radio-${sid}-${guestIdx}:checked`);
        result[sid] = radio ? radio.value : "";

        if (section.followup_trigger && result[sid] === section.followup_trigger) {
          const fr = block.querySelector(`.followup-radio-${sid}-${guestIdx}:checked`);
          result[sid + "_direction"] = fr ? fr.value : "";
        }
      }
    });

    // Shuttle email
    const emailEl = document.getElementById(`shuttle-email-${guestIdx}`)?.querySelector(".shuttleEmail");
    result.email = emailEl ? emailEl.value.trim() : "";

    // Shuttle SKG phone
    const phoneEl = document.getElementById(`shuttle-skg-phone-${guestIdx}`)?.querySelector(".shuttleSKGPhone");
    result.shuttleSKGPhone = phoneEl ? phoneEl.value.trim() : "";

    return result;
  }

  function buildGuestPayload(rawData) {
    return {
      name:            rawData.name,
      langs:           rawData.languages || "",
      diet:            rawData.dietary   || "",
      brunch:          rawData.brunch    || "",
      shuttle:         rawData.shuttle   || "",
      shuttleDirection:rawData.shuttle_direction || "",
      email:           rawData.email          || "",
      shuttleSKGPhone: rawData.shuttleSKGPhone || "",
      mainCourse:      rawData.main_course || "",
      mainCourseTick:  rawData.main_course ? "Yes" : "No",
      _sections:       rawData  // used for review display, stripped before API send
    };
  }

  function collectFormDataForReview() {
    const dict        = d();
    const attendingVal = attending.value;
    const messageVal  = message.value || "";

    if (attendingVal === "No") {
      return { payload: { code: getAuthCode(), attending: attendingVal, message: messageVal, languageUI: currentLang, guests: [], token: API_TOKEN } };
    }

    // All .guest blocks: those in guestsContainer + guest2 block in guest2Section
    const allBlocks = [
      ...document.querySelectorAll("#guestsContainer .guest"),
      ...document.querySelectorAll("#guest2Section .guest")
    ];

    if (!allBlocks.length || !allBlocks[0].querySelector(".guestName")?.value.trim()) {
      return { error: dict.validation_name_required };
    }

    const guests = [];

    for (const block of allBlocks) {
      const guestIdx = parseInt(block.dataset.guestIdx);
      const raw = collectGuestData(guestIdx);
      if (!raw) continue;

      // Required section validation
      for (const section of (rsvpConfig?.sections || [])) {
        if (section.enabled === false || !section.required) continue;
        if (section.type === "single" && !raw[section.id]) {
          const label = section["label_" + lc()] || section.label_en || section.id;
          const msg   = typeof dict.validation_required === "function"
            ? dict.validation_required(label) : dict.validation_required;
          return { error: msg };
        }
      }

      // Shuttle validation
      const shuttleSec = (rsvpConfig?.sections || []).find(s => s.id === "shuttle");
      if (shuttleSec && shuttleSec.enabled !== false && raw.shuttle === "Yes") {
        if (!raw.email)               return { error: dict.validation_shuttle_email_required };
        if ((shuttleSec.followup_options || []).length && !raw.shuttle_direction)
          return { error: dict.validation_shuttle_direction_required };
      }

      // Shuttle SKG validation
      const shuttleSKGSec = (rsvpConfig?.sections || []).find(s => s.id === "Shuttle_SKG");
      if (shuttleSKGSec && shuttleSKGSec.enabled !== false && raw.Shuttle_SKG === "Yes") {
        if (!raw.shuttleSKGPhone) return { error: dict.validation_shuttle_skg_phone_required };
      }

      guests.push(buildGuestPayload(raw));
    }

    return {
      payload: {
        code: getAuthCode(), attending: attendingVal, message: messageVal,
        languageUI: currentLang, guests, token: API_TOKEN
      }
    };
  }

  // ── Review modal ──
  function renderReview(payload) {
    const dict  = d();
    const lang  = lc();
    const rows  = [];

    rows.push(`<div class="review-row">
      <div class="review-label">${esc(dict.attendance_label)}:</div>
      <div class="review-value">${payload.attending === "Yes" ? dict.attending_yes : dict.attending_no}</div>
    </div>`);

    if (payload.attending !== "No") {
      payload.guests.forEach((g, idx) => {
        rows.push(`<div class="review-guest"><div class="review-row">
          <div class="review-label">${esc(dict.guest_label)} ${idx + 1}:</div>
          <div class="review-value">${esc(g.name)}</div>
        </div>`);

        (rsvpConfig?.sections || []).forEach(section => {
          if (section.enabled === false) return;
          const sid   = section.id;
          const sLabel = section["label_" + lang] || section.label_en || sid;
          const val   = g._sections ? g._sections[sid] : "";
          if (!val) return;

          rows.push(`<div class="review-row">
            <div class="review-label">${esc(sLabel)}:</div>
            <div class="review-value">${esc(val)}</div>
          </div>`);

          // Followup value
          if (section.followup_trigger && val === section.followup_trigger) {
            const fLabel = section["followup_label_" + lang] || section.followup_label_en || "";
            const fVal   = g._sections ? g._sections[sid + "_direction"] : "";
            if (fVal) rows.push(`<div class="review-row">
              <div class="review-label">${esc(fLabel)}:</div>
              <div class="review-value">${esc(fVal)}</div>
            </div>`);
          }

          // Shuttle email
          if (sid === "shuttle" && g.email) {
            rows.push(`<div class="review-row">
              <div class="review-label">${esc(dict.shuttle_email_label)}:</div>
              <div class="review-value">${esc(g.email)}</div>
            </div>`);
          }

          // Shuttle SKG phone
          if (sid === "Shuttle_SKG" && g.shuttleSKGPhone) {
            rows.push(`<div class="review-row">
              <div class="review-label">${esc(dict.shuttle_skg_phone_label)}:</div>
              <div class="review-value">${esc(g.shuttleSKGPhone)}</div>
            </div>`);
          }
        });

        rows.push(`</div>`);
      });
    }

    if (payload.message) {
      rows.push(`<div class="review-row" style="margin-top:10px;border-top:1px dashed rgba(201,162,39,.35);padding-top:10px;">
        <div class="review-label">${esc(dict.message_label)}:</div>
        <div class="review-value">${esc(payload.message)}</div>
      </div>`);
    }

    reviewContent.innerHTML = rows.join("");
  }

  function openReview() {
    sendError.style.display = "none";
    sendError.textContent   = "";
    const result = collectFormDataForReview();
    if (result.error) {
      sendError.textContent  = result.error;
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
    const payload = reviewModal._payload;
    if (!payload) return;
    confirmBtn.disabled = true;

    // Strip _sections before sending to API
    const cleanPayload = {
      ...payload,
      guests: payload.guests.map(({ _sections, ...rest }) => rest)
    };

    // Show thank-you immediately for instant UX, send in background
    closeReview();
    goToStep(3);

    try {
      await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(cleanPayload) });
    } catch (err) {
      console.warn("RSVP send error:", err);
    } finally {
      confirmBtn.disabled = false;
    }
  }

  // ── Init ──
  async function init() {
    // Load data in parallel
    await Promise.all([loadGuestlist(), loadRsvpConfig()]);

    // Sync language with site (i18n.js)
    const siteLang = (typeof currentLanguage !== "undefined") ? currentLanguage : "fr";
    currentLang = siteLang === "el" ? "el" : siteLang;

    setLang(currentLang);

    // Render form if authenticated
    const verified = localStorage.getItem("_wedding_guest");
    if (verified) {
      const guestData = JSON.parse(verified);
      const names = guestData.names;
      currentGuests = names;
      isSoloGuest   = names.length === 1;

      familyTitle.textContent = names.join(" • ");
      initGuest2Section();
      renderGuests(names);
      updateFormVisibility();
    }

    // Listen for site language changes
    document.addEventListener("languageChanged", () => {
      const lang = (typeof currentLanguage !== "undefined") ? currentLanguage : "fr";
      setLang(lang === "el" ? "el" : lang);
    });

    attending && attending.addEventListener("change", updateFormVisibility);
    openReviewBtn.addEventListener("click", openReview);
    closeReviewBtn.addEventListener("click", closeReview);
    editBtn.addEventListener("click", closeReview);
    confirmBtn.addEventListener("click", sendFinalRSVP);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
